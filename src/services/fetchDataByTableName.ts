import supabase from "../supabase";
import { TableName } from "../types/table-name";
import { ROWS_PER_PAGE } from "../ui/table/constants/constants";
import { Filter } from "../ui/table/types/types";

const fetchDataByTableName = async (tableName: TableName, page: number, filter?: Filter) => {
 
  let query = supabase.from(tableName).select("*", { count: "exact" });

  if (filter) {
    const { fieldName, fieldValue, type } = filter;
    // TODO any
    query = query[type](fieldName as any, fieldValue);
  }

  if (page) {
    const from = (page - 1) * ROWS_PER_PAGE;
    const to = from + ROWS_PER_PAGE - 1;
    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) throw new Error("Table data cannot be loaded.");

  return { data, count };
};

export { fetchDataByTableName };
