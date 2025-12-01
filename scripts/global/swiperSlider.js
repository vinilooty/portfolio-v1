import Swiper from "swiper/bundle";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { customEases } from "@globals/gsapConfig.js";

export function initSwiperSlider() {
	const swSwiper = new Swiper(".swiper.sw__swiper", {
		slidesPerView: "auto",
		speed: 1200,
		loop: true,
		navigation: {
			nextEl: ".swiper-navigation .swiper-button-next",
			prevEl: ".swiper-navigation .swiper-button-prev",
		},
		spaceBetween: 20,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
	});

	// Swiper Image Hover Effect
	gsap.set(document.querySelectorAll(".sw-slide-img"), { scale: 1.2 });
	const swWrap = document.querySelectorAll(".sw-slide-media");
	swWrap.forEach((wrap) => {
		const swImg = wrap.querySelector(".sw-slide-img");
		if (!swImg) return;

		// Custom Ease
		customEases();

		const moveX = gsap.quickTo(swImg, "xPercent", {
			duration: 0.3,
			ease: "hop",
		});
		const moveY = gsap.quickTo(swImg, "yPercent", {
			duration: 0.3,
			ease: "hop",
		});

		wrap.addEventListener("mousemove", (e) => {
			const bounds = wrap.getBoundingClientRect();
			const xPos = ((e.clientX - bounds.left) / bounds.width) * 100;
			const yPos = ((e.clientY - bounds.top) / bounds.height) * 100;
			const mapX = gsap.utils.mapRange(0, 100, -1, 1)(xPos);
			const mapY = gsap.utils.mapRange(0, 100, -1, 1)(yPos);
			gsap.to(swImg, { scale: 1.1 });
			moveX(mapX);
			moveY(mapY);
		});
		wrap.addEventListener("mouseleave", () => {
			gsap.to(swImg, { scale: 1.2 });
			moveX(0);
			moveY(0);
		});
	});

	// Swiper Slide Overlay Hover Effect
	const swiperSlides = document.querySelectorAll(".swiper-slide");

	swiperSlides.forEach((slide) => {
		const swOverlay = slide.querySelector(".slide__overlay");
		const swOverlayLine = slide.querySelector(".slide__overlay-line");
		const oltexts = slide.querySelectorAll(".oltext");
		const targets = slide.querySelectorAll('[data-hover="reveal up"]');

		if (!targets.length || !swOverlay || !swOverlayLine || !oltexts.length)
			return;

		let allLines = [];
		oltexts.forEach((el) => {
			try {
				const split = SplitText.create(el, { type: "lines", mask: "lines" });
				allLines.push(...split.lines);
			} catch (e) {
				console.warn("SplitText failed to process element:", el, e);
			}
		});

		gsap.set(targets, { opacity: 0, y: "20%", filter: "blur(2px)" });
		gsap.set(swOverlayLine, {
			width: "0%",
			opacity: 0,
		});
		gsap.set(swOverlay, { transformOrigin: "right center" });

		// Custom Ease
		customEases();

		const tl = gsap.timeline({
			paused: true,
			reversed: true,
			defaults: { ease: "hop" },
		});

		tl.to(targets, {
			opacity: 1,
			filter: "blur(0px)",
			y: "0%",
			stagger: 0.05,
			duration: 0.4,
			ease: "hop",
		});
		tl.from(swOverlay, { scaleX: 0, duration: 0.8, opacity: 1 }, "<");
		tl.to(swOverlayLine, { width: "100%", opacity: 1, duration: 0.6 }, "<");
		tl.from(
			allLines,
			{ y: "100%", opacity: 0, duration: 0.4, stagger: 0.02 },
			">"
		);

		slide.addEventListener("mouseenter", () => {
			tl.play();
		});
		slide.addEventListener("mouseleave", () => {
			tl.timeScale(1.5).reverse();
		});
	});
}
