type WithStatus<T> = T & {
	isFulfilled: boolean;
};

type RuleValidatorArguments = {
	password: string;
};

type RuleValidator = (args: RuleValidatorArguments) => boolean;

type SimpleRule = {
	type: "simple";
	id: number;
	v: number;
	description: string;
	images?: string[];
	validate: RuleValidator;
};

type CaptchaRule = {
	type: "captcha";
	id: number;
	v: number;
	description: string;
	captchaText: string;
	captchaImage: string;
	validate: RuleValidator;
	refreshCaptcha: (
		setter: (text: string, image: string, v: number) => void,
	) => void;
};

export type Rule = SimpleRule | CaptchaRule;

export type RuleWithStatus = WithStatus<Rule>;
