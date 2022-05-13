<script lang="ts">
	import { marked } from 'marked';

	export let format: string | undefined;
	export let block: PageFragment;
	export let inline = false;

	const parse = inline ? marked.parseInline : marked.parse;
</script>

{#if block.content}
	{@html format === 'markdown' ? parse(block.content) : block.content}
{/if}

{#if block.children.length}
	<ul>
		{#each block.children as block}
			<li><svelte:self {format} {block} inline={true} /></li>
		{/each}
	</ul>
{/if}
