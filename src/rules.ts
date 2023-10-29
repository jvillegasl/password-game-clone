import moment from "moment";
import { Rule } from "./types";

export const RULES: Rule[] = [
	{
		id: 1,
		description: "Your password must be at least 5 characters.",
		validate: function ({ password }) {
			return password.length >= 5;
		},
	},
	{
		id: 2,
		description: "Your password must include a number.",
		validate: ({ password }) => {
			return /\d/.test(password);
		},
	},
	{
		id: 3,
		description: "Your password must include an uppercase letter.",
		validate: ({ password }) => {
			return /[A-Z]/.test(password);
		},
	},
	{
		id: 4,
		description: "Your password must include a special character.",
		validate: ({ password }) => {
			const pattern = /[a-zA-Z0-9]/g;

			const matches = password.match(pattern);

			const nonSpecialCharactersCount = matches?.length ?? 0;

			const specialCharactersCount =
				password.length - nonSpecialCharactersCount;

			return specialCharactersCount > 0;
		},
	},
	{
		id: 5,
		description: "The digits in your password must add up to 25.",
		validate: ({ password }) => {
			const pattern = /[0-9]/g;

			const digits = password.match(pattern) ?? [];

			const totalSum = digits.reduce((acc, t) => acc + Number(t), 0);

			return totalSum === 25;
		},
	},
	{
		id: 6,
		description: "Your password must include a month of the year.",
		validate: ({ password }) => {
			const months = moment.months().map((t) => t.toLowerCase());

			return months.some((t) => password.toLowerCase().includes(t));
		},
	},
	{
		id: 7,
		description: "Your password must include a roman numeral.",
		validate: ({ password }) => {
			const pattern =
				/M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})/g;

			const matches = password.match(pattern) ?? [];

			const filteredMatches = matches.filter((t) => !!t);

			return !!filteredMatches.length;
		},
	},
];
