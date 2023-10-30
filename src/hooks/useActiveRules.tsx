import { activeRulesAtom, debouncedPasswordAtom } from "@/atoms";
import { RULES } from "@/rules";
import { RuleWithStatus } from "@/types";
import { useAtom } from "jotai";
import { SetStateAction } from "jotai/ts3.8/vanilla";
import { Dispatch, useEffect, useRef } from "react";

function validateRule(
	password: string,
	rule: RuleWithStatus,
	setActiveRules: Dispatch<SetStateAction<RuleWithStatus[]>>,
) {
	const isFulfilled = rule.validate({ password });

	setActiveRules((prev) =>
		prev.map((t) => {
			if (t.id !== rule.id) return t;

			if (isFulfilled === t.isFulfilled) return t;

			return { ...t, isFulfilled };
		}),
	);
}

function validateRules(
	password: string,
	rules: RuleWithStatus[],
	setActiveRules: Dispatch<SetStateAction<RuleWithStatus[]>>,
) {
	console.log(
		"VALIDATING RULES:",
		rules.map((t) => t.id),
	);

	for (let i = 0; i < rules.length; i++) {
		validateRule(password, rules[i], setActiveRules);
	}
}

export function useActiveRules() {
	const [password, setPassword] = useAtom(debouncedPasswordAtom);
	const [activeRules, setActiveRules] = useAtom(activeRulesAtom);

	const activeRulesRef = useRef<RuleWithStatus[]>(activeRules);

	// Add first rule on first password change
	useEffect(() => {
		if (activeRules.length) return;

		if (!password.length) return;

		setActiveRules([{ ...RULES[0], isFulfilled: false }]);
	}, [password, activeRules, setActiveRules]);

	// Add new rule when all current rules are fulfilled
	useEffect(() => {
		if (!activeRules.length) return;

		const everyRuleFulfilled = activeRules.every(
			(t) => t.isFulfilled === true,
		);

		if (!everyRuleFulfilled) return;

		const newRule = RULES[activeRules.length];

		if (!newRule) return;

		setActiveRules((t) => [...t, { ...newRule, isFulfilled: false }]);
	}, [activeRules, setActiveRules]);

	// Update current rules
	// Validate new rules
	useEffect(() => {
		const currentActiveRules = activeRulesRef.current;

		const diffRules = activeRules.filter(
			(rule) =>
				!currentActiveRules.some(
					(currentRule) => currentRule.id === rule.id,
				) ||
				currentActiveRules.some(
					(currentRule) =>
						currentRule.id === rule.id && currentRule.v !== rule.v,
				),
		);

		activeRulesRef.current = activeRules;

		if (!diffRules.length) return;

		validateRules(password, diffRules, setActiveRules);
	}, [activeRules, password, setActiveRules]);

	// Validate rules when password changes
	useEffect(() => {
		const currentActiveRules = activeRulesRef.current;

		if (!currentActiveRules.length) return;

		validateRules(password, currentActiveRules, setActiveRules);
	}, [password, setPassword, setActiveRules]);
}
