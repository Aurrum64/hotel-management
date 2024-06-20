import supabase from "../supabase";
import { TableName } from "../types/table-name";
import { TableFilter } from "../ui/table/api/useFetchTableData";

const fetchDataByTableName = async (tableName: TableName, filter?: TableFilter) => {
  const { fieldName, fieldValue, type } = filter || {};

  let query = supabase.from(tableName).select("*");

  if (fieldValue) {
    const filterType = type ? type : 'eq';
    query = query[filterType](fieldName, fieldValue);
  }
  const { data, error } = await query;

  if (error) throw new Error("Table data cannot be loaded.");

  return data;
};

export { fetchDataByTableName };
