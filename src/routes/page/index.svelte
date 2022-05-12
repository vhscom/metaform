<script type="ts">
	export let pages: Page[];
	export let url: string;
</script>

<h1>Pages</h1>
<ul>
	{#each pages as page}
		{@const name = page['page-name']}
		<li><a sveltekit:prefetch href={encodeURI(`${url}/${name}`)}>{name}</a></li>
	{/each}
</ul>
