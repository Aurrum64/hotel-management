import { useQuery } from "@tanstack/react-query";
import {fetchDataByTableName} from "../../../services/fetchDataByTableName";
import { TableName } from "../../../types/table-name";
import { SimpleMap } from "../../../types/common-types";
import { useSearchParams } from "react-router-dom";
import { TableFilterParams } from "../Table";

export type TableFilter = {
  fieldName: string;
  fieldValue?: string;
  type?: string;
}

export const useFetchTableData = (tableName: TableName, filterParams?: TableFilterParams) => {
    
    const { fieldName, transformFieldValueExpression, type} = filterParams || {};

    const [searchParams] = useSearchParams();
    const filteringFieldValue = searchParams.get(filterParams?.fieldName || "");

    let filter: TableFilter;
    if (filterParams && filteringFieldValue) {
      filter = {
        fieldName,
        fieldValue: transformFieldValueExpression ? transformFieldValueExpression(filteringFieldValue) : filteringFieldValue,
        type: typeof type === 'function' ? type(filteringFieldValue) : type
      }
    }

    const { data, isPending } = useQuery<SimpleMap<any>[]>({
        queryKey: [tableName, filteringFieldValue],
        queryFn: () => fetchDataByTableName(tableName, filter),
      });
    return { data, isPending }
};