export interface ExportPayload {
	name: string;
	type: string;
	size: number;
	last_modified: number;
	data: LogseqExport;
}

// Export file may be a string in a Cloudflare Worker context.
export type ExportFileMaybe = File | string;

/**
 * Scrape file upload request text to determine filename and type.
 *
 * Example parsable input:
 * -----------------------------27410589393048196159818781505\r\nContent-Disposition: form-data; name=\"file\"; filename=\"home_vhs_Documents_LLM_1705872764.json\"\r\nContent-Type: application/json\r\n\r\n{\"version\":1,
 *
 * Example unparsable input:
 * --859cccae713e3a5509bbda86eb28efeb\r\nContent-Disposition: form-data; name=\"file\"\r\n\r\n{\"version\":1,...
 *
 * @param {string} text resolved request text
 * @returns {array} filename and type, if present, or null
 */
export function scrape(text: string): Array<string | null> {
	const re =
		/Content-Disposition: form-data; name="file"; filename="(.*)"\r\nContent-Type:\s(.*)\r\n/;
	const match = re.exec(text);

	if (match?.length && match[1] && match[2]) {
		return [match[1], match[2]];
	}

	return [null, null];
}

export async function payloadForExport(
	file: ExportFileMaybe,
	text: string
): Promise<ExportPayload> {
	let payload: ExportPayload;
	if (typeof file === 'string') {
		const [name, type] = scrape(text);
		payload = {
			name: name ?? 'Unknown',
			type: type ?? 'Unknown',
			size: new Blob([file]).size,
			last_modified: new Date().getTime(),
			data: JSON.parse(file as unknown as string) ?? null
		};
	} else {
		payload = {
			name: file.name,
			type: file.type,
			size: file.size,
			last_modified: file.lastModified,
			data: JSON.parse(await file.text()) ?? null
		};
	}

	return payload;
}
