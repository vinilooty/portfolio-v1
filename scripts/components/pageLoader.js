import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { customEases } from "@globals/gsapConfig.js";

export function pageLoader() {
	customEases();

	const loader = document.querySelector(".loader");
	const loaderBar = document.querySelector(".loader__bar");
	const loaderTop = document.querySelector(".loader__top");
	const loaderBottom = document.querySelector(".loader__bottom");
	const loaderCounterWrap = document.querySelector(".loader__counter-wrap");
	const loaderNumber = document.querySelector(".loader__number");

	let counter = {
		value: 0,
	};
	let loaderDuration = 4;

	function updateLoaderText() {
		let progress = Math.round(counter.value);
		loaderNumber.textContent = progress + "%";
	}
	const hasVisited = sessionStorage.getItem("siteVisited") !== null;
	const comingFromInside = document.referrer.includes(window.location.origin);
	if (comingFromInside) {
		if (loader) loader.style.display = "none";
		return;
	}
	if (hasVisited) {
		loaderDuration = 2;
		counter = { value: 75 };
	}
	sessionStorage.setItem("siteVisited", "true");

	gsap.set(".loader__ov", {
		clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
	});
	gsap.set(".loader__logo", { scale: 15 });
	let tl = gsap.timeline({ defaults: { ease: "loader" } });
	tl.to(counter, {
		onUpdate: () => {
			updateLoaderText();
		},
		value: 100,
		duration: loaderDuration,
	});
	tl.to(
		loaderBar,
		{
			scaleX: 1,
			duration: loaderDuration,
			onComplete: () => {
				gsap.set(".loader__ov", { display: "flex" });
			},
		},
		"0"
	);
	tl.to(".loader__ov", {
		clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		duration: 0.8,
		borderRadius: "0.5rem",
		transformOrigin: "center center",
		ease: "hop",
	});
	tl.to(
		".loader__logo",
		{
			scale: 5,
			duration: 1,
			ease: "hop",
		},
		"<"
	);
	tl.to(loader, {
		y: "-100vh",
		duration: 1,
		onComplete: () => {
			gsap.set(loader, { display: "none" });
		},
	});
}
