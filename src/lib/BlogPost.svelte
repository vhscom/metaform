<script lang="ts">
	import { marked } from 'marked';
	export let format: string | undefined;
	export let items: PageItem[];

	const parse = (md: string) => marked.parse(md);
	const [_, ...postContent] = items;

	const htmlFromBlocks = (blocks: PageItem[], tag?: string) => {
		let str = '';
		blocks.forEach((block) => {
			if (block.content) {
				if (tag) str += `<${tag}>`;
				str += format === 'markdown' ? parse(block.content) : block.content;
				if (tag) str += `</${tag}>`;
			}
			if (block.children.length) {
				str += `<ul>${htmlFromBlocks(block.children, 'li')}</ul>`;
			}
		});

		return str;
	};

	const html = htmlFromBlocks(postContent);
</script>

{@html html}
