import supabase from "../supabase";
import { TableName } from "../types/table-name";
import { Filter } from "../ui/table/Table";

const fetchDataByTableName = async (tableName: TableName, page: number, filter?: Filter) => {
 
  let query = supabase.from(tableName).select("*", { count: "exact" });

  if (filter) {
    const { fieldName, fieldValue, type } = filter;
    // TODO any
    query = query[type](fieldName as any, fieldValue);
  }

  if (page) {
    const from = (page - 1) * 10;
    const to = from + 10 - 1;
    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) throw new Error("Table data cannot be loaded.");

  return { data, count };
};

export { fetchDataByTableName };
