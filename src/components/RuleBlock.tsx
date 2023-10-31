import clsx from "clsx";
import { FaCheck, FaTimes, FaSyncAlt } from "react-icons/fa";
import { useAtom } from "jotai";
import { RuleWithStatus } from "@/types";
import { activeRulesAtom } from "@/atoms";

type RuleBlockProps = {
	rule: RuleWithStatus;
};

export function RuleBlock({ rule }: RuleBlockProps) {
	const setActiveRules = useAtom(activeRulesAtom)[1];

	function getContent() {
		switch (rule.type) {
			case "simple":
				if (!rule.images) return;

				return (
					<div className="mt-4 flex flex-row justify-center gap-8">
						{rule.images.map((image, i) => (
							<img key={i} src={image} className="h-20 w-20" />
						))}
					</div>
				);
			case "captcha": {
				const setter = (
					captchaText: string,
					captchaImage: string,
					v: number,
				) =>
					setActiveRules((prev) =>
						prev.map((t) => {
							if (t.id === rule.id) {
								return { ...t, captchaText, captchaImage, v };
							}

							return t;
						}),
					);

				return (
					<div className="mt-4 flex flex-row justify-center gap-4">
						<img
							src={rule.captchaImage}
							className="rounded-md border-[1px] border-solid border-black"
							alt="CAPTCHA"
						/>

						<button onClick={() => rule.refreshCaptcha(setter)}>
							<FaSyncAlt />
						</button>
					</div>
				);
			}
		}
	}

	return (
		<div
			className={clsx(
				"overflow-hidden rounded-lg border-[1px] border-solid shadow-lg transition-[colors,shadow] duration-500 ease-in-out",
				rule.isFulfilled
					? "border-green-700 shadow-green-200"
					: "border-red-500 shadow-red-200",
			)}
		>
			<div
				className={clsx(
					"flex items-center gap-2 px-4 py-1 transition-colors duration-500 ease-in-out",
					rule.isFulfilled ? "bg-green-300" : "bg-red-300",
				)}
			>
				{rule.isFulfilled ? (
					<FaCheck className="text-green-600" />
				) : (
					<FaTimes className="text-red-600" />
				)}

				<span className="text-lg">Rule {rule.id}</span>
			</div>

			<div
				className={clsx(
					"p-4 pt-3 text-lg",
					rule.isFulfilled ? "bg-green-100" : "bg-red-100",
				)}
			>
				<span>{rule.description}</span>

				{getContent()}
			</div>
		</div>
	);
}
