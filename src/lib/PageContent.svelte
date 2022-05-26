<script lang="ts">
	import ContentBlock from './ContentBlock.svelte';
	import { definesProperties } from '$lib/utils/graph';

	export let blocks: PageBlock[];
	export let embeds: Embeds;
</script>

{#each blocks as block}
	{#if !definesProperties(block)}
		<ContentBlock {block} {embeds} />
	{/if}
{/each}
