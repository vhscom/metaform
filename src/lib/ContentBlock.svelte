<script lang="ts">
	import { marked } from 'marked';
	import { pageEmbed, pageEmbedTag } from '$lib/utils/regex';
	import { skeletonPageFromTitle } from '$lib/utils/embed';
	import PageEmbed from './PageEmbed.svelte';

	export let block: PageFragment;
	export let embeds: Embeds;
	export let inline = false;

	const embedTagSplitter = pageEmbedTag;
	const embedTagTest = (content: string) => embedTagSplitter.test(content);

	const blockForEmbedTag = (content: string) => {
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

	const markup = (content: string, format: string, inline: boolean) => {
		const parse = inline ? marked.parseInline : marked.parse;
		return format === 'markdown' ? parse(content) : content;
	};
</script>

{#if block.content && embedTagTest(block.content)}
	{#each block.content.split(embedTagSplitter) as splitContent}
		{#if embedTagTest(splitContent)}
			<PageEmbed page={blockForEmbedTag(splitContent)} {embeds} />
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
