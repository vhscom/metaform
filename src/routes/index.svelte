<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url, fetch }) => {
		const response = await fetch(
			new URL('/Users_jos_Documents_Logseq_1651697499.json', url.href).href
		);

		if (response.ok) {
			return {
				status: 200,
				props: { logseqExport: await response.json() }
			};
		}

		return {
			status: 404,
			error: 'Big fail.'
		};
	};
</script>

<script lang="ts">
	import PageContent from '$lib/PageContent.svelte';

	export let logseqExport: LogseqExport;

	const pages: Page[] = logseqExport.blocks.filter((block) => block.properties?.public);
	const embeds = { pages: [], blocks: [] };
</script>

{#each pages as page (page.id)}
	{@const [_, ...blocks] = page.children}
	{#if page.properties?.draft === false}
		<h1>{page['page-name']}</h1>
		<PageContent {blocks} {embeds} />
	{/if}
{/each}
