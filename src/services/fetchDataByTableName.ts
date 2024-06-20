import supabase from "../supabase";
import { TableName } from "../types/table-name";
import { Filter } from "../ui/table/Table";

const fetchDataByTableName = async (tableName: TableName, filter?: Filter) => {
 
  let query = supabase.from(tableName).select("*");

  if (filter) {
    const { fieldName, fieldValue, type } = filter;
    // TODO any
    query = query[type](fieldName as any, fieldValue);
  }
  const { data, error } = await query;

  if (error) throw new Error("Table data cannot be loaded.");

  return data;
};

export { fetchDataByTableName };
