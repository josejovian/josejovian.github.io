export function lineify(str: string) {
	return str.replace(/\s/g, "-").toLowerCase();
}
