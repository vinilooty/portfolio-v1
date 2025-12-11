import { gsap } from "gsap";

export function pageTransition() {
	const loader = document.querySelector(".load__grid");
	const items = document.querySelectorAll(".load__grid-item");

	if (!loader || !items.length) return;

	window.addEventListener("pageshow", (event) => {
		if (event.persisted) {
			gsap.set(items, { opacity: 0 });
			gsap.set(loader, { display: "none" });
		}
	});

	requestAnimationFrame(() => {
		gsap.to(items, {
			opacity: 0,
			duration: 0.11,
			stagger: { amount: 0.6, from: "random" },
			onComplete: () => {
				gsap.set(loader, { display: "none" });
			},
		});
	});

	const allLinks = document.querySelectorAll("a[href]");

	allLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			if (
				link.hostname === window.location.hostname &&
				link.hash.length === 0 &&
				link.target !== "_blank" &&
				link.getAttribute("data-transition") !== "none"
			) {
				e.preventDefault();
				const destination = link.href;

				gsap.set(loader, { display: "grid" });

				gsap.fromTo(
					items,
					{ opacity: 0 },
					{
						opacity: 1,
						duration: 0.1,
						stagger: { amount: 0.6, from: "random" },
						onComplete: () => {
							window.location.href = destination;
						},
					}
				);
			}
		});
	});
}
