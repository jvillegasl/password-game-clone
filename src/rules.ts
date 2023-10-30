import moment from "moment";
import { Rule } from "./types";
import {
	generateCaptcha,
	generateRandomString,
	getRomanNumerals,
} from "./utils";

export const RULES: Rule[] = [
	{
		type: "simple",
		id: 1,
		v: 0,
		description: "Your password must be at least 5 characters.",
		validate: function ({ password }) {
			return password.length >= 5;
		},
	},
	{
		type: "simple",
		id: 2,
		v: 0,
		description: "Your password must include a number.",
		validate: ({ password }) => {
			return /\d/.test(password);
		},
	},
	{
		type: "simple",
		id: 3,
		v: 0,
		description: "Your password must include an uppercase letter.",
		validate: ({ password }) => {
			return /[A-Z]/.test(password);
		},
	},
	{
		type: "simple",
		id: 4,
		v: 0,
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
		type: "simple",
		id: 5,
		v: 0,
		description: "The digits in your password must add up to 25.",
		validate: ({ password }) => {
			const pattern = /[0-9]/g;

			const digits = password.match(pattern) ?? [];

			const totalSum = digits.reduce((acc, t) => acc + Number(t), 0);

			return totalSum === 25;
		},
	},
	{
		type: "simple",
		id: 6,
		v: 0,
		description: "Your password must include a month of the year.",
		validate: ({ password }) => {
			const months = moment.months().map((t) => t.toLowerCase());

			return months.some((t) => password.toLowerCase().includes(t));
		},
	},
	{
		type: "simple",
		id: 7,
		v: 0,
		description: "Your password must include a roman numeral.",
		validate: ({ password }) => {
			const romanNumerals = getRomanNumerals(password);

			return !!romanNumerals.length;
		},
	},
	{
		type: "simple",
		id: 8,
		v: 0,
		description: "Your password must include one of our NON-sponsors:",
		validate: ({ password }) => {
			const nonSponsors = ["pepsi", "starbucks", "shell"];

			return nonSponsors.some((t) => password.toLowerCase().includes(t));
		},
		images: [
			"https://neal.fun/password-game/sponsors/pepsi.svg",
			"https://neal.fun/password-game/sponsors/starbucks.svg",
			"https://neal.fun/password-game/sponsors/shell.svg",
		],
	},
	{
		type: "simple",
		id: 9,
		v: 0,
		description:
			"The roman numerals in your password should multiply to 35.",
		validate: ({ password }) => {
			const romanNumerals = getRomanNumerals(password, true);

			const totalSum = romanNumerals.reduce((acc, t) => acc * t, 1);

			return totalSum === 35;
		},
	},
	{
		type: "captcha",
		id: 10,
		v: 0,
		description: "Your password must include this CAPTCHA:",
		...(() => {
			const captchaText = generateRandomString(6);
			const captchaImage = generateCaptcha(captchaText);

			return { captchaText, captchaImage };
		})(),
		validate: function ({ password }) {
			return password.includes(this.captchaText);
		},
		refreshCaptcha: function (setter) {
			const captchaText = generateRandomString(6);
			const captchaImage = generateCaptcha(captchaText);

			setter(captchaText, captchaImage, this.v + 1);
		},
	},
];
