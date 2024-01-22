<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ pages, url } = data);
</script>

<h1>Pages</h1>
{#if pages?.length}
	<ul>
		{#each pages as page}
			{@const name = page['page-name']}
			<li><a data-sveltekit-preload-data href={encodeURI(`${url}/${name}`)}>{name}</a></li>
		{/each}
	</ul>
{:else}
	<p>No page data to display. Did you <a href="/upload">Upload</a> a file yet?</p>
{/if}
