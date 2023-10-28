type RuleValidateArguments = {
	password: string;
};

type RuleValidate = (args: RuleValidateArguments) => boolean;

export type Rule = {
	id: number;
	description: string;
	validate: RuleValidate;
};

export type RuleWithStatus = Rule & {
	isFulfilled: boolean;
};
