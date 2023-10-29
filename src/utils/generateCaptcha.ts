import { fabric } from "fabric";

export function generateCaptcha(text: string) {
	const canvas = new fabric.Canvas("captchaCanvas");

	canvas.width = 200;
	canvas.height = 80;

	let left = 20;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		const canvasText = new fabric.Text(char, {
			left: left,
			top: 30,
			fontSize: 30,
			fontFamily: "Arial",
			fill: "black",
		});

		canvasText.set("angle", fabric.util.getRandomInt(-10, 10));
		canvasText.set("scaleX", fabric.util.getRandomInt(8, 12) / 10);
		canvasText.set("scaleY", fabric.util.getRandomInt(8, 12) / 10);

		canvas.add(canvasText);

		left += (canvasText.width ?? 0) * (canvasText.scaleX ?? 0) + 5; // Espaciado entre caracteres
	}

	return canvas.toDataURL();
}
