<script lang="ts">
	export let items: PageItem[];
</script>

<dl>
	{#each items as item}
		<dt>id</dt>
		<dd>{item.id}</dd>
		{#if item.format}
			<dt>format</dt>
			<dd>{item.format}</dd>
		{/if}
		{#if item.properties}
			<dt>properties</dt>
			<dd>{JSON.stringify(item.properties)}</dd>
		{/if}
		{#if item.content}
			<dt>content</dt>
			<dd>{@html item.content}</dd>
		{/if}
		{#if item.children}
			<svelte:self items={item.children} />
		{/if}
	{/each}
</dl>
