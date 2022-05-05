<script lang="ts">
	import PageItems from './PageItems.svelte';

	export let info: PageInfo;
</script>

<div class:ghost={!info.properties?.public}>
	{#if info['page-name']}
		<dt>page-name</dt>
		<dd>{info['page-name']}</dd>
	{/if}
	<dt>id</dt>
	<dd>{info.id}</dd>
	{#if info.format}
		<dt>format</dt>
		<dd>{info.format}</dd>
	{/if}
	{#if info.properties}
		<dt>properties</dt>
		<dd>{JSON.stringify(info.properties)}</dd>
	{/if}
	{#if info.children}
		<PageItems items={info.children} />
	{/if}
</div>

<style>
	dt,
	dd {
		background-color: darkmagenta;
	}
	.ghost {
		opacity: 0.25;
	}
</style>
