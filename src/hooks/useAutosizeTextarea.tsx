import { RefObject, useEffect } from "react";

export function useAutosizeTextarea(
	textareaRef: RefObject<HTMLTextAreaElement>,
	value: string,
) {
	useEffect(() => {
		const textareaEl = textareaRef.current;

		if (!textareaEl) return;
		const computedStyle = getComputedStyle(textareaEl);
		const borderYWidth =
			parseFloat(computedStyle.borderTopWidth) +
			parseFloat(computedStyle.borderBottomWidth);

		const newHeight = textareaEl.scrollHeight + borderYWidth + "px";

		if (textareaEl.style.height === newHeight) return;

		textareaEl.style.height = newHeight;
	}, [textareaRef, value]);
}
