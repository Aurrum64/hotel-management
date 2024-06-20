import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDataByTableName } from "../../../services/fetchDataByTableName";
import { TableName } from "../../../types/table-name";
import { useSearchParams } from "react-router-dom";
import { getCurrentPage, getTotalPages } from "../utils/helpers";
import { Filter, FilterBySearchParam, FilterConfig, FilterTransformTemplate, TableData } from "../types/types";

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

  const currentPage = getCurrentPage(searchParams);

  const { data: tableData, isPending } = useQuery<TableData>({
    queryKey: [tableName, filter, currentPage],
    queryFn: () => fetchDataByTableName(tableName, currentPage, filter),
  });

  const { data, count } = tableData || {};

  const pageCount = getTotalPages(count || 0);

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
