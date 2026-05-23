import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'; 

const supabaseUrl = process.env.SUPABASE_URL; 
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey); //instancia de base de datos

export { supabase };