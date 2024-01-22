import { error, fail } from '@sveltejs/kit';
import { supabase } from '$lib/server';
import { type ExportPayload, type ExportFileMaybe, payloadForExport } from '$lib/utils/upload';
import type { PageServerLoad, Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const text = await request.clone().text();
		const formData = await request.formData();
		const file = formData.get('file') as ExportFileMaybe;

		if (!file) {
			return fail(400, { missing: true });
		}
		if (typeof file !== 'string' && !file.size) {
			return fail(400, { empty: true });
		} else if (typeof file === 'string' && !file.length) {
			return fail(400, { empty: true });
		}

		// Process data here and not in page endpoint via POST to `url.href`
		// due to request.text() parsing issue when scraping file data.
		const payload: ExportPayload = await payloadForExport(file, text);
		const { data: _, error: err } = await supabase.from('export').insert(payload);
		if (err) {
			return fail(400, { failed: true });
		}

		return { success: true };
	}
};

export const load: PageServerLoad = async ({ url, fetch }) => {
	const res = await fetch(`${url.href}`, {
		headers: { Accept: 'application/json' }
	});
	if (res.ok) {
		return { uploads: (await res.json()).uploads };
	}
	error(404, 'Big fail.');
};
