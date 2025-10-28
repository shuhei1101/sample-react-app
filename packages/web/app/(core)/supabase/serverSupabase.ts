import { createClient } from "@supabase/supabase-js";

console.log("process.env.SUPABASE_SERVICE_ROLE_KEY");
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);

export const serverSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
