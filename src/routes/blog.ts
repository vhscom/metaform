import type { RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/core/services';

export const get: RequestHandler = async () => {
	const { data: pages, error } = await supabase.from('page').select('*');

	if (error) {
		return { status: 404, error: 'Error fetching pages reported by server.' };
	}

	return { body: { pages } };
};
