import { createClient } from "@supabase/supabase-js";
import { Database } from './types/supabase-schema'

export const supabaseUrl = "https://ldgkibmeadawgotmcrwh.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZ2tpYm1lYWRhd2dvdG1jcndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyOTk5MDksImV4cCI6MjAzMzg3NTkwOX0.uHuypeNr3U_d1Iloo3mdaWAgRi1YJWLeFm8yxtWvfXY";

  const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
