import clsx from "clsx";
import { FaCheck, FaTimes } from "react-icons/fa";
import { RuleWithStatus } from "@/types";

type RuleBlockProps = {
	rule: RuleWithStatus;
};

export function RuleBlock({ rule }: RuleBlockProps) {
	return (
		<div
			className={clsx(
				"overflow-hidden rounded-lg border-[1px] border-solid shadow-lg",
				rule.isFulfilled
					? "border-green-700 shadow-green-200"
					: "border-red-500 shadow-red-200",
			)}
		>
			<div
				className={clsx(
					"flex items-center gap-2 px-4 py-1",
					rule.isFulfilled ? "bg-green-300" : "bg-red-300",
				)}
			>
				{rule.isFulfilled ? (
					<FaCheck className="text-green-600" />
				) : (
					<FaTimes className="text-red-600" />
				)}

				<span className="text-lg">
					{" "}
					Rule {rule.id} {JSON.stringify(rule.isFulfilled)}
				</span>
			</div>

			<div
				className={clsx(
					"p-4 pt-3 text-lg",
					rule.isFulfilled ? "bg-green-100" : "bg-red-100",
				)}
			>
				{rule.description}
			</div>
		</div>
	);
}
