import type { RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/core/services';

export const get: RequestHandler = async () => {
	const { data: exports, error } = await supabase
		.from('export')
		.select('name,size,inserted_at')
		.order('inserted_at', { ascending: false })
		.limit(10);

	if (error) {
		return { status: 400, body: { error } };
	}

	return {
		body: { uploads: exports }
	};
};

interface ExportPayload {
	name: string;
	type: string;
	size: number;
	last_modified: number;
	data: LogseqExport;
}

function scrape(text: string): Array<string | null> {
	const re =
		/Content-Disposition: form-data; name="file"; filename="(.*)"\r\nContent-Type:\s(.*)\r\n/;
	const match = re.exec(text);

	if (match?.length && match[1] && match[2]) {
		return [match[1], match[2]];
	}

	return [null, null];
}

export const post: RequestHandler = async ({ request }) => {
	const text = await request.clone().text();
	const formData = await request.formData();
	const file = formData.get('file') as File;

	let payload: ExportPayload;

	/**
	 * Cloudflare returns string for File unless a flag is set. This will change
	 * in the future though it will likely require enabling a compatibility. Until
	 * then scrape the filename and grab the mime type from the request text.
	 *
	 * Ref: https://developers.cloudflare.com/workers/platform/compatibility-dates/#formdata-parsing-supports-file
	 * Ref: https://community.cloudflare.com/t/cannot-seem-to-send-multipart-form-data/163491/3
	 *
	 * // return { status: 418, body: { message: 'Short at stout' } };
	 */
	if (typeof file === 'string') {
		const [name, type] = scrape(text);
		payload = {
			name: name ?? 'Unknown',
			type: type ?? 'Unknown',
			size: new Blob([file]).size,
			last_modified: new Date().getTime(),
			data: JSON.parse(file as unknown as string)
		};
	} else {
		payload = {
			name: file.name,
			type: file.type,
			size: file.size,
			last_modified: file.lastModified,
			data: JSON.parse(await file.text())
		};
	}

	const { data: body, error } = await supabase.from('export').insert(payload);

	if (error) {
		return { status: 400, body: { error } };
	}

	return { status: 201, body };
};
