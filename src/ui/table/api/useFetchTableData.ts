import { useQuery } from "@tanstack/react-query";
import {fetchDataByTableName} from "../../../services/fetchDataByTableName";
import { TableName } from "../../../types/table-name";
import { SimpleMap } from "../../../types/common-types";

export const useFetchTableData = (tableName: TableName) => {
    const { data, isPending } = useQuery<SimpleMap<any>[]>({
        queryKey: [tableName],
        queryFn: () => fetchDataByTableName(tableName),
      });
      return { data, isPending }
};