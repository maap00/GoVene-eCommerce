import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase";

const configuredSupabaseUrl = import.meta.env.VITE_PROJECT_URL_SUPABASE ?? import.meta.env.VITE_SUPABASE_URL;
const configuredSupabaseKey = import.meta.env.VITE_SUPABASE_API_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

// Keep the public storefront renderable when Supabase is not connected in a preview.
// Auth and data actions will still fail with their normal request error until the integration is configured.
const supabaseUrl = configuredSupabaseUrl || "https://preview-placeholder.supabase.co";
const supabaseKey = configuredSupabaseKey || "preview-placeholder-anon-key";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
