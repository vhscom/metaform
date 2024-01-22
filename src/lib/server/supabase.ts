import { createClient, type SupabaseClientOptions } from '@supabase/supabase-js';
import { SUPABASE_PUBLIC_ANON_KEY, SUPABASE_PROJECT_URL } from '$env/static/private';

const options: SupabaseClientOptions<'public'> = {
	/**
	 * By default the API server points to the `public` schema.
	 * https://supabase.com/docs/reference/javascript/initializing
	 */
	db: { schema: 'public' },
	global: {
		headers: { 'x-my-custom-header': 'metaform' },
		fetch: globalThis.fetch // use native fetch
	},
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true
	}
};

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_ANON_KEY, options);
