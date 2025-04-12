import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://nvqfjvyuhjwrhgswgfao.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cWZqdnl1aGp3cmhnc3dnZmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODU2NDksImV4cCI6MjA2MDA2MTY0OX0.56V8Y-GFAujWyPd5rSbxkU_AVGpEJCagJ5Gjaa5Q3_E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);