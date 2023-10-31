import { FaAsterisk } from "react-icons/fa";
import "./App.css";
import { PasswordInput, RulesList } from "./components";
import { useActiveRules } from "./hooks";

function App() {
	useActiveRules();

	return (
		<main className="p-4">
			<div className="mx-auto max-w-md py-16">
				<h1 className="mb-12 text-center text-3xl">
					<FaAsterisk className="inline align-bottom" /> The Password
					Game
				</h1>

				<PasswordInput className="mb-8" />

				<RulesList />
			</div>
		</main>
	);
}

export default App;
