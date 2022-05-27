<script lang="ts">
	import { marked } from 'marked';
	import { filterXSS } from 'xss';
	import {
		pageEmbed,
		blockEmbed,
		pageEmbedTag,
		blockEmbedTag,
		embedTagSplitter
	} from '$lib/utils/regex';
	import { blockForEmbed, skeletonForBlockEmbed, skeletonForPageEmbed } from '$lib/utils/embed';
	import PageEmbed from './PageEmbed.svelte';
	import BlockEmbed from './BlockEmbed.svelte';

	export let block: PageBlock;
	export let embeds: Embeds;
	export let inline = false;

	const pageEmbedTagTest = (content: string) => pageEmbedTag.test(content);
	const anyEmbedTagTest = (content: string) => embedTagSplitter.test(content);
	const blockEmbedTagTest = (content: string) => blockEmbedTag.test(content);

	const pageForPageEmbed = (content: string) => {
		const page = blockForEmbed(content, pageEmbed, embeds) as Page;
		return page ? page : skeletonForPageEmbed(content, pageEmbed);
	};

	const blockForBlockEmbed = (content: string) => {
		const block = blockForEmbed(content, blockEmbed, embeds) as PageBlock;
		return block ? block : skeletonForBlockEmbed(content, blockEmbed);
	};

	const markup = (content: string, format: string, inline: boolean) => {
		const sanitized = filterXSS(content);
		const parse = inline ? marked.parseInline : marked.parse;
		return format === 'markdown' ? parse(sanitized) : sanitized;
	};
</script>

{#if block.content && anyEmbedTagTest(block.content)}
	{#each block.content.split(embedTagSplitter) as splitContent}
		{#if pageEmbedTagTest(splitContent)}
			<PageEmbed page={pageForPageEmbed(splitContent)} {embeds} />
		{:else if blockEmbedTagTest(splitContent)}
			<BlockEmbed block={blockForBlockEmbed(splitContent)} {embeds} />
		{:else}
			{@html markup(splitContent, block.format, inline)}
		{/if}
	{/each}
{:else}
	{@html markup(block.content, block.format, inline)}
{/if}

{#if block.children.length}
	<ul>
		{#each block.children as block}
			<li><svelte:self {block} {embeds} inline={true} /></li>
		{/each}
	</ul>
{/if}
