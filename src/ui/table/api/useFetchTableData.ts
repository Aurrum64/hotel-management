import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDataByTableName } from "../../../services/fetchDataByTableName";
import { TableName } from "../../../types/table-name";
import { SimpleMap } from "../../../types/common-types";
import { useSearchParams } from "react-router-dom";
import {
  Filter,
  FilterBySearchParam,
  FilterConfig,
  FilterTransformTemplate,
} from "../Table";
import { PAGINATION_QUERY_PARAM_NAME } from "../components/pagination";

type TableData = {
  data: SimpleMap<any>[];
  count: number | null;
};

export const useFetchTableData = (
  tableName: TableName,
  filterConfig?: FilterConfig
) => {
  const [searchParams] = useSearchParams();
  const queryCLient = useQueryClient();

  let filter: Filter;

  if (filterConfig) {
    const filteringFieldValue = searchParams.get(filterConfig.queryParamName);

    if (filteringFieldValue) {
      // TODO This transform logic is way too custom and probably should be living outside of the table component
      if ((filterConfig as FilterTransformTemplate)?.transformTemplate) {
        filter = (filterConfig as FilterTransformTemplate).transformTemplate(
          filteringFieldValue
        );
      } else {
        const { queryParamName, type } =
          (filterConfig as FilterBySearchParam) || {};
        queryParamName &&
          (filter = {
            fieldName: queryParamName,
            fieldValue: filteringFieldValue,
            type: type || "eq",
          });
      }
    }
  }

  // TODO Move to a separate function
  const currentPage = !searchParams.get(PAGINATION_QUERY_PARAM_NAME)
    ? 1
    : Number(searchParams.get(PAGINATION_QUERY_PARAM_NAME));

  const { data: tableData, isPending } = useQuery<TableData>({
    queryKey: [tableName, filter, currentPage],
    queryFn: () => fetchDataByTableName(tableName, currentPage, filter),
  });
  const { data, count } = tableData || {};

  const pageCount = Math.ceil(count || 0 / 10);

  if (currentPage < pageCount) {
    queryCLient.prefetchQuery({
      queryKey: [tableName, filter, currentPage + 1],
      queryFn: () => fetchDataByTableName(tableName, currentPage, filter),
    });
  }

  if (currentPage > 1) {
    queryCLient.prefetchQuery({
      queryKey: [tableName, filter, currentPage - 1],
      queryFn: () => fetchDataByTableName(tableName, currentPage, filter),
    });
  }

  return { data, count, isPending };
};
