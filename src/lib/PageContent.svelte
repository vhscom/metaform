<script lang="ts">
	import Html from './Html.svelte';

	export let format: string | undefined;
	export let blocks: PageFragment[];

	function definesProperties(block: PageFragment) {
		return block.properties && Reflect.ownKeys(block.properties).length;
	}
</script>

{#each blocks as block}
	{#if !definesProperties(block)}
		<Html {format} {block} />
	{/if}
{/each}
