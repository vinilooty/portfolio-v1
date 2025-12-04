import { gsap } from "gsap";

export function approachCards() {
    const approachItems = document.querySelectorAll(".approach__item");
	const allItemImg = document.querySelectorAll(".approach__item-media");

	approachItems.forEach((item) => {
		const itemImg = item.querySelector(".approach__item-media");
		if (!itemImg) return;

		const moveX = gsap.quickTo(itemImg, "x", {
			duration: 0.8,
			ease: "power3.out",
		});
		const moveY = gsap.quickTo(itemImg, "y",  {
			duration: 0.8,
			ease: "power3.out",
        });
        const rotate = gsap.quickTo(itemImg, "rotation", {
    duration: 0.8,
    ease: "power3.out"
});
		item.addEventListener("mouseenter", () => {
			gsap.set(itemImg, {
				opacity: 0,
				scale: 1.1,
				xPercent: -50,
				yPercent: -50,
                duration: 0.03,
                overwrite: "auto",
                force3D: true,
			});
			const tl = gsap
				.timeline()
				.to(itemImg, {
					opacity: 0,
					scale: 1,
					duration: 0.01,
                    ease: "power2.out",
                    overwrite: "auto",
				})
				.to(
					itemImg,
					{
						opacity: 1,
						scale: 1,
						duration: 0.1,
						ease: "power2.out",
						overwrite: "auto",
					},">0.2"
				);
		});
		item.addEventListener("mousemove", (ev) => {
			const r = item.getBoundingClientRect();
            const x = ev.clientX - r.left;
			const y = ev.clientY - r.top;
			moveX(x);
            moveY(y);
            
            const progress = x / r.width;
            const rotation = progress * 20 - 10;

            rotate(rotation)
		});
		item.addEventListener("mouseleave", () => {
			gsap.to(itemImg, {
				opacity: 0,
				scale: 1.1,
				duration: 0.1,
				ease: "power2.in",
                overwrite: "auto",
			});
		});
	});
}