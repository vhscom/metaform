<script lang="ts">
	import PageContent from '$lib/PageContent.svelte';
	export let pages: PageInfo[];
</script>

{#each pages as page (page.id)}
	{#if page.properties?.draft === false}
		<h1>{page['page-name']}</h1>
		<PageContent format={page.format} fragments={page.children} />
	{/if}
{/each}
