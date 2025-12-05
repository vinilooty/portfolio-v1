import { gsap } from "gsap";
import { customEases } from "@globals/gsapConfig.js";
import { addResponsiveHover } from "@globals/responsiveInput.js";


function textSwapper(selector = "[data-message]") {
	const elements = document.querySelectorAll(selector);

	elements.forEach((el) => {
		const newText = el.dataset.message;
		if (!newText) return;

		const target = el.querySelector("[data-swap-target]") || el;
		const originalText = target.textContent;

		const onEnter = () => {
			gsap.to(target, {
				opacity: 0,
				duration: 0.15,
				ease: "power2.out",
				onComplete: () => {
					target.textContent = newText;
					gsap.to(target, {
						opacity: 1,
						duration: 0.25,
						ease: "power2.out",
					});
				},
			});
		};

		const onLeave = () => {
			gsap.to(target, {
				opacity: 0,
				duration: 0.15,
				ease: "power2.out",
				onComplete: () => {
					target.textContent = originalText;
					gsap.to(target, {
						opacity: 1,
						duration: 0.25,
						ease: "power2.out",
					});
				},
			});
		};

		addResponsiveHover(el, onEnter, onLeave);
	});
}

function initBounceHovers(direction) {
	document
		.querySelectorAll(`[data-hover="bounce ${direction}"]`)
		.forEach((el) => {
			const tl = gsap.timeline({ paused: true, reversed: true });

			tl.to(el, {
				scale: 1.1,
				duration: 0.25,
				ease: "back.inOut",
			});

			const onEnter = () => tl.play();
			const onLeave = () => tl.timeScale(1.5).reverse();

			addResponsiveHover(el, onEnter, onLeave);
		});
}

function initButtonLogic() {
	const buttons = document.querySelectorAll(".button");

	buttons.forEach((button) => {
		const buttonText = button.querySelector(".button__text");
		const buttonDot = button.querySelector(".main-circle-wrap");

		const message = button.dataset.swap;
		if (!buttonText || !buttonDot || !message) return;

		const originalText = buttonText.textContent;

		const tl = gsap.timeline({ paused: true });

		tl.to(buttonDot, {
			scale: 1.1,
			rotation: 90,
			borderRadius: "0%",
			ease: "back.inOut",
			duration: 0.8,
		});

		tl.to(
			buttonText,
			{
				opacity: 0,
				y: -5,
				duration: 0.3,
				onComplete: () => {
					buttonText.textContent = message;
				},
			},
			"<"
		);

		tl.to(
			buttonText,
			{
				opacity: 1,
				y: 0,
				duration: 0.3,
				ease: "power2.out",
				onReverseComplete: () => {
					buttonText.textContent = originalText;
				},
			},
			">"
		);

		const onEnter = () => tl.timeScale(1).play();
		const onLeave = () => tl.timeScale(1).reverse();

		addResponsiveHover(button, onEnter, onLeave);
	});
}


function textHoverReveal(el) {
	customEases();

	const tl = gsap.timeline({ paused: true, reversed: true });

	tl.from(el, {
		x: -10,
		opacity: 0,
		duration: 0.3,
		ease: "hop",
	});

	const onEnter = () => tl.play();
	const onLeave = () => tl.timeScale(1.5).reverse();

	addResponsiveHover(el, onEnter, onLeave);
}

function initListItemHover() {
	const valueItem = document.querySelectorAll(".value__list-item");
	const itemLines = document.querySelectorAll(".list-line--fill");

	gsap.set(itemLines, { opacity: 0, scaleX: "0%" });

	valueItem.forEach((item) => {
		const itemLine = item.querySelector(".list-line--fill");
		if (!itemLine) return;

		customEases();

		const tl = gsap.timeline({ paused: true, reversed: true });

		tl.set(itemLine, {
			opacity: 0.8,
			scaleX: "0%",
			transformOrigin: "center",
		}).to(itemLine, {
			opacity: 1,
			scaleX: "100%",
			duration: 0.5,
			ease: "hop",
		});

		const onEnter = () => tl.play();
		const onLeave = () => tl.timeScale(1.5).reverse();

		addResponsiveHover(item, onEnter, onLeave);
	});
}

export function initButtonInteractions() {
	initBounceHovers("left");
	initBounceHovers("right");
	initButtonLogic();
	textSwapper();
	document.querySelectorAll('[data-hover="reveal"]').forEach(textHoverReveal);
	initListItemHover();
}
