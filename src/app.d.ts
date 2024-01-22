/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
	// prettier-ignore
	export type Json =
		| string
		| number
		| boolean
		| null
		| { [key: string]: Json | undefined }
		| Json[]

	interface NamedEmbeds extends Json {
		pages: string[];
		blocks: string[];
	}

	interface NamedReferences extends Json {
		pages: string[];
		blocks: string[];
	}

	interface Embeds extends Json {
		pages: Page[];
		blocks: PageBlock[];
	}

	interface PageBlock extends Json {
		id: string;
		properties?: object;
		format: string;
		children: PageBlock[];
		content: string;
	}

	interface PageProperties {
		public?: boolean;
		draft?: boolean;
	}

	interface Page extends JSONObject {
		id: string;
		'page-name'?: string;
		properties?: PageProperties;
		format?: string;
		children: PageBlock[];
	}

	interface LogseqExport {
		version: number;
		blocks: Page[];
	}

	// See https://vitejs.dev/guide/env-and-mode
	// for information about these interfaces
	interface ImportMetaEnv {
		/**
		 * Items here will become available under `import.meta.env`.
		 * Prefix used configurable. See Vite docs for more.
		 * @example
		 * readonly VITE_SUPABASE_PUBLIC_ANON_KEY: string;
		 */
	}
	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}

	// See https://kit.svelte.dev/docs/types#app
	// for information about these interfaces
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}

		// See https://kit.svelte.dev/docs/adapter-cloudflare-workers#custom-config
		// for information about this interface
		interface Platform {
			env?: {
				// YOUR_KV_NAMESPACE: KVNamespace;
				// YOUR_DURABLE_OBJECT_NAMESPACE: DurableObjectNamespace;
			};
		}
	}
}

export {};
