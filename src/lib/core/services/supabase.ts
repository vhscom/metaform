import { createClient } from '@supabase/supabase-js';

const options = {
	/**
	 * By default the API server points to the `public` schema.
	 * https://supabase.com/docs/reference/javascript/initializing#api-schemas
	 */
	schema: 'public',
	headers: { 'x-my-custom-header': 'svelte-headlessui-starter' },
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true
};

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_PROJECT_URL,
	import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY,
	options
);
