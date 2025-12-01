import { gsap } from "gsap";

export default function initCursor() {
	const cursorWrap = document.querySelector(".cursor__wrap");
	const cursor = document.querySelector(".cursor");

	if (!cursorWrap || !cursor) {
		console.warn("Cursor elements missing. Skipping cursor init.");
		return;
	}

	gsap.set(cursor, { xPercent: -50, yPercent: -50 });

	const moveX = gsap.quickTo(cursor, "x", {
		duration: 0.4,
		ease: "power3.out",
	});
	const moveY = gsap.quickTo(cursor, "y", {
		duration: 0.4,
		ease: "power3.out",
	});

	window.addEventListener("mousemove", (e) => {
		moveX(e.clientX);
		moveY(e.clientY);
	});

	// Cursor States Setup
	const cursorPlayR = document.querySelector(".cursor__play-reel");
	const cursorCloseR = document.querySelector(".cursor__close-reel");
	const cursorViewP = document.querySelector(".cursor__view-project");

	const playState = document.querySelectorAll('[data-cursor="play"]');
	const closeState = document.querySelectorAll('[data-cursor="close"]');
	const viewState = document.querySelectorAll('[data-cursor="view"]');
	const smallState = document.querySelectorAll('a, [data-cursor="small"]');

	// Helper to safely call window.closeModal if it exists (for closeState click)
	const safeCloseModal =
		typeof window.closeModal === "function" ? window.closeModal : () => {};

	// Timelines for cursor states
	const createCursorTimeline = (textElement) => {
		const tl = gsap.timeline({
			paused: true,
			onStart: () => {
				gsap.set(cursor, {
					width: "1rem",
					height: "1rem",
					rotation: -90,
					borderRadius: "50%",
					backgroundColor: textElement === cursorCloseR ? "#222222" : "", 
				});
				gsap.set(textElement, {
					width: "0%",
					opacity: 0,
					transformOrigin: "center center",
				});
			},
			onReverseComplete: () => {
				gsap.set(cursor, { backgroundColor: "" });
			},
		});
		tl.to(cursor, {
			width: "8rem",
			height: "8rem",
			rotation: 0,
			borderRadius: "0%",
			ease: "back.inOut",
			duration: 0.4,
		});
		tl.to(
			textElement,
			{ width: "100%", opacity: 1, duration: 0.4, ease: "power2.out" },
			"-=0.2"
		);
		return tl;
	};

	const playTl = createCursorTimeline(cursorPlayR);
	const closeTl = createCursorTimeline(cursorCloseR);
	const viewTl = createCursorTimeline(cursorViewP);

	const smallTl = gsap.timeline({ paused: true });
	smallTl.to(cursor, { scale: 0.5, ease: "back.inOut", duration: 0.2 });

	const allTimelines = [playTl, closeTl, viewTl, smallTl];

	function handleCursorState(activeTl) {
		allTimelines.forEach((tl) => {
			if (tl !== activeTl) {
				tl.timeScale(1.5).reverse();
			}
		});
		activeTl.timeScale(1).play();
	}

	// Attach event listeners
	playState.forEach((el) => {
		el.addEventListener("mouseenter", () => handleCursorState(playTl));
		el.addEventListener("mouseleave", () => playTl.timeScale(1.5).reverse());
	});

	closeState.forEach((el) => {
		el.addEventListener("mouseenter", () => handleCursorState(closeTl));
		el.addEventListener("click", safeCloseModal); // Using safe call
		el.addEventListener("mouseleave", () => closeTl.timeScale(1.5).reverse());
	});

	viewState.forEach((el) => {
		el.addEventListener("mouseenter", () => handleCursorState(viewTl));
		el.addEventListener("mouseleave", () => viewTl.timeScale(1.5).reverse());
	});

	smallState.forEach((el) => {
		el.addEventListener("mouseenter", () => handleCursorState(smallTl));
		el.addEventListener("mouseleave", () => smallTl.timeScale(1.5).reverse());
	});
}
