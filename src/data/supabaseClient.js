import { createClient } from '@supabase/supabase-js';

// load these from somewhere else eventually
const supabaseUrl = "https://vsfdwikfdhteyktahnda.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZmR3aWtmZGh0ZXlrdGFobmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU3MTE1MjgsImV4cCI6MTk5MTI4NzUyOH0.DxI-YV96BThC5Y2kHqMO2_67awc_8OvUmGz0xy6yK5A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);