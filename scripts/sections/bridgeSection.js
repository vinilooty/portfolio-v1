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

	const roleSplit = new SplitText(role, { type: "words",mask:"words",  });
	const bridgeSplit = new SplitText(bridge, { type: "words",mask:"words",  });
	const thatSplit = new SplitText(that, { type: "words",mask:"words",  });
	const gapSplit = new SplitText(gap, { type: "chars", charsClass:"chars" ,});

	const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

	tl.fromTo(
		role,
		{ x: "-25vw", y: "-35vh", },
		{ x: "-25vw", y: "-35vh", duration: 0.8, stagger:0.1 }
	);
	tl.fromTo(
		bridge,
		{ x: "30vw", y: "-35vh" },
		{ x: "30vw", y: "-35vh", duration: 0.8, stagger:0.1 }
	);
	tl.fromTo(
		that,
		{ x: "2vw", y: "-35vh" },
		{ x: "2vw", y: "-35vh", duration: 0.8,  stagger:0.1 }
	);
	tl.fromTo(
		gapSplit.chars,
		{ x: "20vw", y: "-20vh", opacity: 0 },
		{ x: "20vw", y: "-20vh", duration: 0.8, scale: 1.8,stagger:0.1, opacity: 1 }
	);
	tl.to(gap, { duration: 1, letterSpacing: "20vw" },"-=0.4");

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
		onEnter: setHeavy,
		onLeave: setLight,
		onEnterBack: setHeavy,
		onLeaveBack: setLight,
		end: "bottom bottom",
		scrub: true,
		markers: true,
		animation: tl,
	});
}
