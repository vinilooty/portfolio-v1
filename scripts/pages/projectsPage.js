import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function projectsPage() {
	const slides = document.querySelectorAll(".slider-media");
	const pinDistance = window.innerHeight * slides.length;
	const progressBar = document.querySelector(".slider-progress");
	const sliderIndices = document.querySelector(".slider-indices");
	const sliderText = document.querySelectorAll(".slide-title");

	let activeSlide = 0;
	let currentSplit = null;
	function createIndices() {
		sliderIndices.innerHTML = "";
		slides.forEach((_, index) => {
			const indexNum = (index + 1).toString().padStart(2, "0");
			const indicatorElement = document.createElement("p");
			indicatorElement.dataset.index = index;
			indicatorElement.innerHTML = `<span class="marker"></span><span class="index">${indexNum}</span>`;
			sliderIndices.appendChild(indicatorElement);
			if (index === 0) {
				gsap.set(indicatorElement.querySelector(".index"), {
					opacity: 1,
				});
				gsap.set(indicatorElement.querySelector(".marker"), {
					scaleX: 1,
				});
			} else {
				gsap.set(indicatorElement.querySelector(".index"), { opacity: 0.35 });
				gsap.set(indicatorElement.querySelector(".marker"), {
					scaleX: 0,
				});
			}
		});
	}
	function animateNewSlide(index) {
		const slide = slides[index];
		const textElements = slide.querySelectorAll(".slide-up");

		if (currentSplit) currentSplit.revert();

		currentSplit = new SplitText(textElements, {
			type: "lines",
			lineClass: "line",
			mask: "lines",
		});

		slides.forEach((s, i) => {
			gsap.to(s, {
				opacity: i === index ? 1 : 0,
				duration: 0.5,
				ease: "power2.out",
			});
			gsap.set(s, { zIndex: i === index ? 2 : 1 });
		});
		gsap.from(currentSplit.lines, {
			y: "100%",
			opacity: 0,
			duration: 0.4,
			stagger: 0.02,
		});

		animateIndicators(index);
	}

	function animateIndicators(index) {
		const indicators = sliderIndices.querySelectorAll("p");
		indicators.forEach((indicator, i) => {
			const markerElement = indicator.querySelector(".marker");
			const indexElement = indicator.querySelector(".index");
			if (i === index) {
				gsap.to(indexElement, {
					opacity: 1,
					duration: 0.3,
					ease: "power2.out",
				});
				gsap.to(markerElement, {
					scaleX: 1,
					duration: 0.3,
					ease: "power2.out",
				});
			} else {
				gsap.to(indexElement, {
					opacity: 0.5,
					duration: 0.3,
					ease: "power2.out",
				});
				gsap.to(markerElement, {
					scaleX: 0,
					duration: 0.3,
					ease: "power2.out",
				});
			}
		});
	}
	//old function when the text was separated from the slide. Now they're in the same Section, treated 
	//as a component
	/* function animateNewTitle(index) {
		if (currentSplit) {
			currentSplit.revert();
		}
		sliderText.forEach((text, i) => {
			if (i === index) {
				gsap.set(text, { opacity: 1, visibility: "visible" });
				currentSplit = new SplitText(text, {
					type: "lines",
					lineClass: "line",
					mask: "lines",
				});
				gsap.from(currentSplit.lines, {
					yPercent: 100,
					opacity: 0,
					duration: 0.75,
					stagger: 0.1,
					ease: "power3.out",
				});
			} else {
				gsap.set(text, { opacity: 0, visibility: "hidden" });
			}
		});
	} */

	createIndices();
	animateNewSlide(0);

	ScrollTrigger.create({
		trigger: ".slider",
		start: "top top",
		end: `+=${pinDistance}px`,
		scrub: 1,
		pin: true,
		pinSpacing: true,
		onUpdate: (self) => {
			gsap.set(progressBar, {
				scaleY: self.progress,
			});
			const currentSlide = Math.floor(self.progress * slides.length);
			if (
				activeSlide !== currentSlide &&
				currentSlide >= 0 &&
				currentSlide < slides.length
			) {
				activeSlide = currentSlide;
				animateNewSlide(activeSlide);
			}
		},
	});
}
