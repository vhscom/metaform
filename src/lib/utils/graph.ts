/**
 * Check for blocks which define properties.
 *
 * @param block Arbitrary block in the graph
 * @returns Number of properties or undefined if properties key not present
 */
export function definesProperties(block: Page | PageFragment) {
	return block.properties && Reflect.ownKeys(block.properties).length;
}

/**
 * Get blocks for page.
 *
 * @param page Page block in the graph
 * @returns Ordered pair containing properties block, if present, and content blocks
 */
export function blocksForPage(page: Page) {
	return definesProperties(page)
		? page.children
		: ([undefined, ...page.children] as PageFragment[]);
}

/**
 * Search graph recursively using regular expression with named capture group.
 * Peeks at content only and ignores branches which define properties.
 *
 * @param block Arbitrary block in the graph
 * @param re Expression to search with containing named capture group
 * @param group Name of capture group
 * @returns Array of matches with results for named capture groups.
 */
export function findByExpression(block: Page | PageFragment, re: RegExp, group: string) {
	const reGlobal = new RegExp(re, 'g');
	const matches = [] as Array<string>;

	block.children.forEach((child) => {
		if (!definesProperties(child)) {
			if (child.content && re.test(child.content)) {
				let match: RegExpExecArray | null;
				while ((match = reGlobal.exec(child.content)) !== null) {
					const result = match.groups && match.groups[group];
					result && matches.push(result);
				}
			}
			matches.push(...findByExpression(child, re, group));
		}
	});

	return matches;
}
