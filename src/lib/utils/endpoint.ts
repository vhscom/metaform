export function containsEncodedComponents(str: string) {
	// ie ?,=,&,/ etc
	return decodeURI(str) !== decodeURIComponent(str);
}
