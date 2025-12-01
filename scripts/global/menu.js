import { lockScroll, unlockScroll } from "@globals/utils.js";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { customEases } from "@globals/gsapConfig.js";

export default function initMenu() {
	const menuToggle = document.querySelector(".menu-toggle");
	const menuWrap = document.querySelector(".menu-wrap");
	const menuLinks = document.querySelectorAll(".menu-link");
	const menuMediaWrap = document.querySelector(".menu-video-wrapper");
	const menuMediaContent = document.querySelector(".menu-video");
	const menuLabels = document.querySelector(".menu-labels");
	const menuDot = document.querySelector(".menu-fill");
	const openText = document.querySelector(".menu-open-text");
	const closeText = document.querySelector(".menu-close-text");

	if (!menuToggle || !menuWrap || !openText || !closeText) {
		console.warn("Menu DOM elements missing — skipping menu init.");
		return;
	}

	// Menu Toggle Icon Hover
	gsap.set(menuDot, { scale: 0.5 });
	menuToggle.addEventListener("mouseenter", () => {
		gsap.to(menuDot, {
			scale: 1,
			ease: "back.inOut",
			duration: 0.6,
			rotation: 90,
		});
	});
	menuToggle.addEventListener("mouseleave", () => {
		gsap.to(menuDot, {
			scale: 0.5,
			ease: "back.inOut",
			duration: 0.4,
			rotation: 0,
		});
	});

	// Custom Ease
	customEases();

	const splitText = new SplitText(menuLabels, {
		type: "words",
		linesClass: "split-line",
	});

	const masterTL = gsap.timeline({
		paused: true,
		defaults: { ease: "hop" },
	});

	gsap.set(menuMediaContent, { scale: 1.25, opacity: 0 });
	gsap.set(menuMediaWrap, {
		clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
	});

	masterTL
		.set(menuWrap, { display: "flex", yPercent: -100 })
		.to(menuWrap, { yPercent: 0, duration: 0.8 })
		.from(
			menuLinks,
			{
				yPercent: 50,
				opacity: 0,
				stagger: 0.2,
				duration: 0.2,
			},
			"<0.2"
		)
		.to(
			menuMediaWrap,
			{
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				duration: 0.8,
				borderRadius: "0.5rem",
			},
			"<"
		)
		.to(
			".nav-contain",
			{
				color: "#f9f3ef",
				duration: 0.8,
			},
			0
		)
		.to(
			menuMediaContent,
			{
				opacity: 1,
				duration: 0.25,
			},
			"<"
		)
		.to(
			menuMediaContent,
			{
				scale: 1,
				duration: 1.25,
			},
			"<"
		)
		.from(
			splitText.words,
			{
				opacity: 0,
				x: -45,
				duration: 0.6,
				stagger: 0.1,
			},
			"<"
		)
		.to(
			menuDot,
			{
				borderRadius: "0%",
				duration: 0.6,
				ease: "power2.inOut",
				backgroundColor: "#f9f3ef",
			},
			"0"
		)
		.to(
			openText,
			{
				opacity: 0,
				duration: 0.4,
				ease: "power2.inOut",
				onComplete: () => {
					openText.style.display = "none";
					gsap.set(closeText, { display: "block", opacity: 0 });
				},
			},
			"0"
		)
		.to(
			closeText,
			{
				opacity: 1,
				duration: 0.4,
				ease: "power2.inOut",
			},
			">"
		);

	// Menu Toggle Handler
	masterTL.reversed(true);
	menuToggle.addEventListener("click", () => {
		const opening = masterTL.reversed();

		if (opening) {
			lockScroll();
			masterTL.play();
		} else {
			masterTL.timeScale(1.5).reverse();
			masterTL.eventCallback("onReverseComplete", () => {
				unlockScroll();
				closeText.style.display = "none";
				gsap.set(openText, { display: "block", opacity: 1 });
			});
		}
	});

	// Menu Item Hover Logic
	function menuItemHover() {
		const menuItems = document.querySelectorAll(".menu-link");
		const itemVideos = document.querySelectorAll(".menu-video");

		menuItems.forEach((item, i) => {
			const video = itemVideos[i];
			const currentItem = document.querySelector(".menu-link.w--current");

			// Handle initial state for current item video
			if (currentItem) {
				const index = [...menuItems].indexOf(currentItem);
				if (index > -1 && itemVideos[index]) {
					gsap.to(itemVideos[index], {
						clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
						duration: 0.4,
						borderRadius: "0.5rem",
					});
					itemVideos[index].classList.add("is-current");
				}
			}

			// Prepare hover animation state for all videos
			gsap.set(video, {
				clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
			});

			const pathTL = gsap.timeline({
				paused: true,
				reversed: true,
				onStart: () => {
					video.classList.add("is-active");
				},
				onReverseComplete: () => {
					video.classList.remove("is-active");
				},
			});

			pathTL
				.to(video, {
					clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					duration: 0.4,
					borderRadius: "0.5rem",
				})
				.to(
					item,
					{
						x: "10%",
						duration: 0.4,
						ease: "power2.out",
					},
					0
				);

			item.addEventListener("mouseenter", () => {
				pathTL.play();
			});
			item.addEventListener("mouseleave", () => {
				pathTL.timeScale(1.5).reverse();
			});
		});
	}
	menuItemHover();
}
