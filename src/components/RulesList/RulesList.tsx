import "./RulesList.scss";

import { useMemo } from "react";
import { useAtom } from "jotai";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { activeRulesAtom } from "@/atoms";
import { RuleBlock } from "..";

export function RulesList() {
	const [activeRules] = useAtom(activeRulesAtom);

	const sortedActiveRules = useMemo(
		() =>
			[...activeRules].sort((a, b) => {
				if (a.isFulfilled === b.isFulfilled) {
					return b.id - a.id;
				}

				return a.isFulfilled ? 1 : -1;
			}),
		[activeRules],
	);

	return (
		<TransitionGroup component="ul" className="flex flex-col gap-6">
			{sortedActiveRules.map((rule) => (
				<CSSTransition
					timeout={500}
					classNames="rule-item"
					key={rule.id}
				>
					<li>
						<RuleBlock rule={rule} />
					</li>
				</CSSTransition>
			))}
		</TransitionGroup>
	);
}
