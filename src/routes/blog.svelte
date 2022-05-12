<script lang="ts">
	import PageContent from '$lib/PageContent.svelte';
	export let pages: Page[];
</script>

{#each pages as page (page.id)}
	{@const [_, ...blocks] = page.children}
	{#if page.properties?.draft === false}
		<h1>{page['page-name']}</h1>
		<PageContent format={page.format} {blocks} />
	{/if}
{/each}
