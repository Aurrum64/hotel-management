import { Database } from "./supabase-schema";

export type TableName = keyof Database['public']['Tables'];