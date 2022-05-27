<script lang="ts">
	import { marked } from 'marked';
	import {
		pageEmbed,
		blockEmbed,
		pageEmbedTag,
		blockEmbedTag,
		embedTagSplitter
	} from '$lib/utils/regex';
	import { skeletonPageFromTitle, skeletonPageBlockFromUuid } from '$lib/utils/embed';
	import PageEmbed from './PageEmbed.svelte';
	import BlockEmbed from './BlockEmbed.svelte';

	export let block: PageBlock;
	export let embeds: Embeds;
	export let inline = false;

	const pageEmbedTagTest = (content: string) => pageEmbedTag.test(content);
	const anyEmbedTagTest = (content: string) => embedTagSplitter.test(content);
	const blockEmbedTagTest = (content: string) => blockEmbedTag.test(content);

	const blockForPageEmbedTag = (content: string) => {
		const matches = content.match(pageEmbed);
		if (matches?.groups && matches.groups['title']) {
			const { title } = matches.groups;
			const embededPage = embeds.pages.find((embed) => embed['page-name'] === title);
			if (embededPage) {
				return embededPage;
			} else {
				const skeletonPage = skeletonPageFromTitle(title);
				skeletonPage.children[0].content = '_Page content not loaded or unavailable._';
				return skeletonPage;
			}
		}

		return skeletonPageFromTitle('Error');
	};

	const blockForBlockEmbedTag = (content: string) => {
		const matches = content.match(blockEmbed);
		if (matches?.groups && matches.groups['uuid']) {
			const { uuid } = matches.groups;
			const embeddedBlock = embeds.blocks.find((embed) => embed['id'] === uuid);
			if (embeddedBlock) {
				return embeddedBlock;
			} else {
				const skeletonPageBlock = skeletonPageBlockFromUuid(uuid);
				skeletonPageBlock.content = '_Block content not loaded or unavailable._';
				return skeletonPageBlock;
			}
		}

		return skeletonPageBlockFromUuid('00000000-0000-0000-0000-000000000000');
	};

	const markup = (content: string, format: string, inline: boolean) => {
		const parse = inline ? marked.parseInline : marked.parse;
		return format === 'markdown' ? parse(content) : content;
	};
</script>

{#if block.content && anyEmbedTagTest(block.content)}
	{#each block.content.split(embedTagSplitter) as splitContent}
		{#if pageEmbedTagTest(splitContent)}
			<PageEmbed page={blockForPageEmbedTag(splitContent)} {embeds} />
		{:else if blockEmbedTagTest(splitContent)}
			<BlockEmbed block={blockForBlockEmbedTag(splitContent)} {embeds} />
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
