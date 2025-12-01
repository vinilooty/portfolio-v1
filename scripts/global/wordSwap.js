import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { customEases } from "@globals/gsapConfig.js";

export default function initWordSwap() {
	const words = ["performance.", "speed.", "results.", "growth.", "impact."];
	let index = 0;
	const swap = document.querySelector(".swap");

	if (!swap) return;

	// Custom Ease
	customEases();

	let split = new SplitText(swap, { type: "chars" });

	function animateSwap() {
		gsap.to(split.chars, {
			yPercent: -100,
			opacity: 0,
			stagger: 0.02,
			duration: 0.25,
			ease: "power2.in",
			onComplete: () => {
				index = (index + 1) % words.length;

				split.revert();
				swap.textContent = words[index];

				// Re-split the new text
				split = new SplitText(swap, { type: "chars" });

				gsap.from(split.chars, {
					yPercent: 100,
					opacity: 0,
					stagger: 0.02,
					duration: 0.35,
					ease: "power3.out",
				});
			},
		});
	}

	// Start the loop
	setInterval(animateSwap, 2000);
}
