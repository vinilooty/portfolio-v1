import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { customEases } from "@globals/gsapConfig.js";

export function initJourneySection() {
	const questions = document.querySelectorAll("[data-question]");

	customEases();

	questions.forEach((el, index) => {
		const relatedAnswer = document.querySelector(`[data-answer="${index}"]`);
		const hoverEl = el.querySelector(".element-hover");

		if (!relatedAnswer || !hoverEl) return;

		let split;
		try {
			split = new SplitText(relatedAnswer, {
				type: "words",
				mask: "words",
			});
			gsap.set(split.words, { opacity: 0, y: "100%" });
		} catch (e) {
			console.warn("SplitText failed:", e);
			return;
		}

		const hoverIn = () => {
			relatedAnswer.classList.add("visible");
			gsap.to(split.words, {
				opacity: 1,
				y: "0%",
				duration: 0.2,
				ease: "hop",
				stagger: 0.01,
				overwrite: true,
			});

			gsap.to(hoverEl, {
				height: "100%",
				duration: 0.5,
				ease: "hop",
			});
		};

		const hoverOut = () => {
			gsap.to(split.words, {
				opacity: 0,
				y: "100%",
				duration: 0.2,
				ease: "hop",
				stagger: 0.01,
				overwrite: true,
				onComplete: () => relatedAnswer.classList.remove("visible"),
			});

			gsap.to(hoverEl, {
				height: "0%",
				duration: 0.5,
				ease: "hop",
			});
		};

		
		el.addEventListener("mouseenter", hoverIn);
		el.addEventListener("mouseleave", hoverOut);
	});
}
