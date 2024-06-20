import { useQuery } from "@tanstack/react-query";
import {fetchDataByTableName} from "../../../services/fetchDataByTableName";
import { TableName } from "../../../types/table-name";
import { SimpleMap } from "../../../types/common-types";
import { useSearchParams } from "react-router-dom";
import { Filter, FilterBySearchParam, FilterConfig, FilterTransformTemplate } from "../Table";

export const useFetchTableData = (tableName: TableName, filterConfig?: FilterConfig) => {
    const [searchParams] = useSearchParams();

    let filter: Filter;

    if (filterConfig) {
    const filteringFieldValue = searchParams.get(filterConfig.queryParamName);

    if (filteringFieldValue) {
      // TODO This transform logic is way too custom and probably should be living outside of the table component
      if ((filterConfig as FilterTransformTemplate)?.transformTemplate) {
        filter = (filterConfig  as FilterTransformTemplate).transformTemplate(filteringFieldValue);
      } else {
        const { queryParamName, type } = filterConfig as FilterBySearchParam || {};
        queryParamName && (filter = {
          fieldName: queryParamName,
          fieldValue: filteringFieldValue,
          type: type || 'eq'
        });
      }
    }
  }
    const { data, isPending } = useQuery<SimpleMap<any>[]>({
        queryKey: [tableName, filter],
        queryFn: () => fetchDataByTableName(tableName, filter),
      });
    return { data, isPending }
};