import { FaAsterisk } from "react-icons/fa";
import "./App.css";
import { PasswordInput, RuleBlock } from "./components";
import { useAtom } from "jotai";
import { activeRulesAtom } from "./atoms";
import { useMemo } from "react";
import { useActiveRules } from "./hooks";

function App() {
	const [activeRules] = useAtom(activeRulesAtom);
	const sortedActiveRules = useMemo(
		() => [...activeRules].reverse(),
		[activeRules],
	);

	useActiveRules();

	return (
		<main className="p-4">
			<div className="mx-auto max-w-md py-16">
				<h1 className="mb-12 text-center text-3xl">
					<FaAsterisk className="inline align-bottom" /> The Password
					Game
				</h1>

				<PasswordInput classname="mb-8" />

				<ul className="flex flex-col gap-6">
					{sortedActiveRules.map((rule, i) => (
						<li key={i}>
							<RuleBlock rule={rule} />
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}

export default App;
