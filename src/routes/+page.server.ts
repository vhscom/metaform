import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const file = '/Users_jos_Documents_Logseq_1651697499.json';
	const res = await fetch(new URL(file, url.href).href);
	if (res.ok) {
		return { logseqExport: await res.json() };
	}
	error(404, 'Big fail.');
};
