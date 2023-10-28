import { Rule } from "./types";

export const RULES: Rule[] = [
	{
		id: 1,
		description: "Your password must be at least 5 characters.",
		validate: ({ password }) => {
			if (password.length < 5) {
				console.log("Rule 1 failed");
				return false;
			}

			console.log("Rule 1 fulfilled");
			return true;
		},
	},
	{
		id: 2,
		description: "Your password must be at least 10 characters.",
		validate: ({ password }) => {
			if (password.length < 10) {
				console.log("Rule 2 failed");
				return false;
			}

			console.log("Rule 2 fulfilled");
			return true;
		},
	},
	{
		id: 3,
		description: "Your password must be at least 15 characters.",
		validate: ({ password }) => {
			if (password.length < 15) {
				console.log("Rule 3 failed");
				return false;
			}

			console.log("Rule 3 fulfilled");
			return true;
		},
	},
];
