import type { RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/core/services';

export const get: RequestHandler = async ({ url }) => {
	const { data: pages, error } = await supabase.from('page').select('*');

	if (error) {
		return { status: 400, body: { error } };
	}

	return { body: { pages, url } };
};
