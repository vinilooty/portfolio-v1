import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { customEases } from "@globals/gsapConfig.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

//value section animations
// -------------------------
export function valueSectionAnimations() {
	const valueSection = document.querySelector(".value__section");
	const pageWrapper = document.querySelector(".page-wrapper");

	if (!valueSection || !pageWrapper) return;

	customEases();

	const tl = gsap.timeline({ defaults: { ease: "none" } });

	tl.to([pageWrapper, ".sw__section"], {
		backgroundColor: "#000000",
		color: "#f9f3ef",
	})
		.to(".is-accent", { color: "#1f8276" }, "<")
		.to(
			".list-line",
			{ backgroundColor: "rgba(31, 130, 118, 0.5)", duration: 0.6 },
			"<"
		)
		.to(
			[".list-line--fill", ".main-circle-wrap"],
			{ backgroundColor: "#42c0ba" },
			"<"
		)
		.from(".approach-cta", {
			opacity: 0,
			xPercent: -100,
			duration: 2,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".approach-cta",
				start: "bottom bottom",
				end: "top top",
				scrub: true,
			},
		});

	ScrollTrigger.create({
		animation: tl,
		trigger: valueSection,
		start: "top 50%",
		end: "bottom top",
		toggleActions: "play reverse play reverse",
	});
}

// footer animations
export function footerAnimations() {
	const footerWrap = document.querySelector(".footer__container");
	const footerTrack = document.querySelector(".footer__track");

	if (!footerWrap || !footerTrack) return;

	customEases();

	const targets = footerWrap.querySelectorAll('[data-appear="reveal up"]');

	gsap.set(targets, { opacity: 0, y: "20%", filter: "blur(2px)" });
	gsap.set(footerWrap, {
		clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
		scale: 1.4,
	});

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: footerTrack,
			start: "top 60%",
			end: "bottom bottom",
			scrub: 0.4,
		},
	});

	tl.to(footerWrap, {
		clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		scale: 1,
	})
		.to(targets, {
			opacity: 1,
			filter: "blur(0px)",
			y: "0%",
			stagger: 0.05,
			duration: 0.4,
			ease: "hop",
		})
		.from(
			document.querySelector(".svg-2"),
			{
				xPercent: -30,
				yPercent: 30,
				opacity: 0,
				ease: "hop",
			},
			">-0.5"
		)
		.from(
			".circle.is-footer",
			{
				scale: 0,
				opacity: 0,
				duration: 0.6,
			},
			"-=0.8"
		);
}
// Journey section
export function journeySectionAnimation() {
	const journeyVideoWrap = document.querySelector(".journey__video-wrap");
	const journeyTrigger = document.querySelector(".journey__track");

	if (journeyVideoWrap && journeyTrigger) {
		gsap.to(journeyVideoWrap, {
			scale: 0.3,
			x: "25%",
			y: "-20%",
			scrollTrigger: {
				trigger: journeyTrigger,
				start: "top top",
				end: "bottom bottom",
				scrub: true,
			},
		});
	}
}

// scroll indicator
export function scrollIndicator() {
	const scrollBar = document.querySelector(".scroll__progress");
	const scrollFill = document.querySelector(".scroll__progress--fill");

	if (!scrollBar || !scrollFill) return;

	gsap.set(scrollFill, { transformOrigin: "top center" });

	ScrollTrigger.create({
		scroller: document.body,
		start: 0,
		end: "max",
		scrub: 1,
		onUpdate: (self) => {
			gsap.set(scrollFill, {
				scaleY: self.progress,
			});
		},
	});
}

// master init
export function initScrollAnimations() {
	valueSectionAnimations();
	footerAnimations();
	scrollIndicator();
	journeySectionAnimation();
}
