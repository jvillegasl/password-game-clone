import clsx from "clsx";
import { useAtom } from "jotai";
import { passwordAtom } from "@/atoms";

type PasswordInputProps = { classname?: string };

export function PasswordInput({ classname }: PasswordInputProps) {
	const [password, setPassword] = useAtom(passwordAtom);

	return (
		<form
			className={clsx("grid", classname)}
			onSubmit={(e) => e.preventDefault()}
		>
			<label className="mb-2 text-lg" htmlFor="passwordInput">
				Please choose a password
			</label>

			<div className="relative">
				<input
					id="passwordInput"
					className="w-full rounded-lg border-[1px] border-solid border-gray-500 p-4 text-3xl outline-none transition-[border] focus-visible:border-black"
					type="text"
					value={password}
					autoComplete="off"
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>

				<div className="absolute right-0 top-0 -translate-y-full pb-2 sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-full sm:p-0 sm:pl-4">
					<span className="text-lg">{password.length}</span>
				</div>
			</div>
		</form>
	);
}
