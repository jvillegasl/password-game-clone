import romans from "romans";

export function getRomanNumerals(input: string, toNumber: true): number[];
export function getRomanNumerals(input: string, toNumber?: false): string[];
export function getRomanNumerals(input: string, toNumber = false) {
	const pattern = /M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})/g;

	const matches = input.match(pattern) ?? [];

	const romanNumerals = matches.filter((t) => !!t);

	if (!toNumber) return romanNumerals;

	return romanNumerals.map((t) => romans.deromanize(t));
}
