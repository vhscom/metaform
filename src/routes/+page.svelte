<script lang="ts">
	import PageContent from '$lib/PageContent.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { logseqExport }: { logseqExport: LogseqExport } = data;

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
