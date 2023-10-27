import { FaAsterisk } from "react-icons/fa";
import "./App.css";
import { PasswordInput, RuleBlock } from "./components";

function App() {
	return (
		<main className="p-4">
			<div className="mx-auto max-w-md py-16">
				<h1 className="mb-12 text-center text-3xl">
					<FaAsterisk className="inline align-bottom" /> The Password
					Game
				</h1>

				<PasswordInput classname="mb-8" />

				<ul className="flex flex-col gap-6">
					<li>
						<RuleBlock isFulfilled={true} ruleCode={12}>
							Your password must include a number.
						</RuleBlock>
					</li>

					<li>
						<RuleBlock isFulfilled={false} ruleCode={12}>
							Your password must include a number.
						</RuleBlock>
					</li>
				</ul>
			</div>
		</main>
	);
}

export default App;
