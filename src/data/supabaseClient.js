import { createClient } from '@supabase/supabase-js';

// load these from somewhere else eventually
const supabaseUrl = "your_supabase_url";
const supabaseAnonKey = "your_supabase_anon_key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
