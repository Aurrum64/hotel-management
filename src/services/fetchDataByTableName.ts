import supabase from "../supabase";
import { TableName } from "../types/table-name";

const fetchDataByTableName = async (tableName: TableName) => {
  const { data, error } = await supabase.from(tableName).select("*");

  if (error) throw new Error("Table data cannot be loaded.");

  return data;
};

export { fetchDataByTableName };
