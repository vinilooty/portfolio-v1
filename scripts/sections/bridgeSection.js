import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { customEases } from "@globals/gsapConfig.js";
import { lenisRef } from "@globals/lenis.js";
import initSmoothScroll from "@globals/lenis.js";

export function bridgeSection() {
	if (!lenisRef) {
		console.warn("lenisRef not initialized yet");
	}
	initSmoothScroll();
	customEases();

	const role = document.querySelector(".bridge-gap.is-role");
	const bridge = document.querySelector(".bridge-gap.is-bridge");
	const that = document.querySelector(".bridge-gap.is-that");
	const gap = document.querySelector(".bridge-gap.is-gap");

	const trigger = document.querySelector(".bridge-track");

	const roleSplit = new SplitText(role, { type: "words", mask: "words" });
	const bridgeSplit = new SplitText(bridge, { type: "words", mask: "words" });
	const thatSplit = new SplitText(that, { type: "words", mask: "words" });
	const gapSplit = new SplitText(gap, { type: "chars", charsClass: "chars" });

	gsap.set([role, bridge, that], { opacity: 1 });
	gsap.set(gap, { opacity: 1 });

	gsap.set(role, { x: "-35vw", y: "-45vh" });
	gsap.set(bridge, { x: "2vw", y: "-45vh" });
	gsap.set(that, { x: "35vw", y: "-45vh" });
	gsap.set(gapSplit.chars, {
		opacity: 0,
		yPercent: 100,
		x: "20vw",
		y: "-20vh",
	});

	const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

	tl.to(role, { x: "-25vw", y: "-35vh", duration: 1 });
	tl.from(
		roleSplit.words,
		{ yPercent: 100, stagger: 0.05, duration: 0.6 },
		"<"
	);

	tl.to(bridge, { x: "2vw", y: "-35vh", duration: 1 }, "<0.2");
	tl.from(
		bridgeSplit.words,
		{ yPercent: 100, stagger: 0.05, duration: 0.6 },
		"<"
	);

	tl.to(that, { x: "25vw", y: "-35vh", duration: 1 }, "<0.2");
	tl.from(
		thatSplit.words,
		{ yPercent: 100, stagger: 0.05, duration: 0.6 },
		"<"
	);

	tl.to(
		gapSplit.chars,
		{
			opacity: 1,
			yPercent: 0,
			scale: 1.8,
			duration: 0.8,
			stagger: 0.05,
		},
		"-=0.5"
	);

	tl.to(gap, { letterSpacing: "20vw", duration: 1 }, "<0.2");

	const setHeavy = () => {
		lenisRef.duration = 4;
		lenisRef.easing = (t) => t * 0.4;
	};
	const setLight = () => {
		lenisRef.duration = 2;
		lenisRef.easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
	};

	ScrollTrigger.create({
		trigger: trigger,
		start: "top top",
		end: "bottom bottom",
		scrub: true,
		markers: true,
		onEnter: setHeavy,
		onLeave: setLight,
		onEnterBack: setHeavy,
		onLeaveBack: setLight,
		animation: tl,
	});
}
