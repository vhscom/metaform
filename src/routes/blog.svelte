<script lang="ts">
	import Page from '$lib/Page.svelte';
	export let pages: PageInfo[];
</script>

{#each pages as page (page.id)}
	{#if page.properties?.draft === false}
		<h1>{page['page-name']}</h1>
		<Page format={page.format} items={page.children} />
	{/if}
{/each}
