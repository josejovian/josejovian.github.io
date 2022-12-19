export function toAltDateFormat(dateObject: string) {
	const date = new Date(dateObject);

	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}
