import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import { debouncedPasswordAtom, passwordAtom } from "@/atoms";
import { useRef } from "react";
import { useAutosizeTextarea } from "@/hooks";

type PasswordInputProps = { className?: string };

export function PasswordInput({ className }: PasswordInputProps) {
	const password = useAtomValue(passwordAtom);
	const setPassword = useSetAtom(debouncedPasswordAtom);

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useAutosizeTextarea(textareaRef, password);

	return (
		<form
			className={clsx("grid", className)}
			onSubmit={(e) => e.preventDefault()}
		>
			<label className="mb-2 text-lg" htmlFor="passwordInput">
				Please choose a password
			</label>

			<div className="relative">
				<textarea
					ref={textareaRef}
					id="passwordInput"
					className="w-full resize-none overflow-hidden rounded-lg border-[1px] border-solid border-gray-500 p-4 text-3xl leading-none outline-none transition-[border] focus-visible:border-black"
					value={password}
					autoComplete="off"
					rows={1}
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>

				<div className="absolute right-0 top-0 -translate-y-full pb-2 sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-full sm:p-0 sm:pl-4">
					<span className="text-lg">{password.length}</span>
				</div>
			</div>
		</form>
	);
}
