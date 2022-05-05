/// <reference types="@sveltejs/kit" />

interface PageItem {
	id: string;
	properties?: JSON;
	format: string;
	children: PageItem[];
	content?: string;
}

interface PageInfo {
	id: string;
	'page-name'?: string;
	properties?: { public?: boolean };
	format?: string;
	children: PageItem[];
}

interface LogseqExport {
	version: number;
	blocks: PageInfo[];
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
