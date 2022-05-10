<script lang="ts">
	import BlogPost from '$lib/BlogPost.svelte';
	export let pages: PageInfo[];
</script>

{#each pages as page (page.id)}
	{#if page.properties?.draft === false}
		<h1>{page['page-name']}</h1>
		<BlogPost format={page.format} items={page.children} />
	{/if}
{/each}
