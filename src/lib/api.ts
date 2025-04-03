import { supabase } from './supabase';

export const fetchListings = async (page = 1, limit = 10) => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
