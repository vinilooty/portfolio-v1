import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
export function philosophySection() {
	const images = gsap.utils.toArray(".philosophy__media-wrap");
	const text = document.querySelector(".philosophy__p");

	const textSplit = new SplitText(text, { type: "lines, words", mask: "words" });

	const trigger = document.querySelector(".laptop-track");

	const motionOffsets = [
		{ x: "-40vw", y: "-80vw", rotation: -120 },
		{ x: "40vw", y: "-70vw", rotation: 90 },
		{ x: "-5vw", y: "-80vw", rotation: 180 },
		{ x: "15vw", y: "-60vw", rotation: -90 },
		{ x: "-12vw", y: "-85vw", rotation: 60 },
	];

	const expandStartOffsets = [0, 0.2, 0.35, 0.55, 0.8];

	const tl = gsap.timeline();

	images.forEach((img, i) => {
		const motion = motionOffsets[i % motionOffsets.length];
		const expandOffset = expandStartOffsets[i % expandStartOffsets.length];

		const original = {
			width: img.offsetWidth,
			height: img.offsetHeight,
		};
		const smallSize = 80;

		gsap.set(img, {
			x: motion.x,
			y: motion.y,
			rotation: motion.rotation,
			width: smallSize,
			height: smallSize,
			opacity: 0,
			transformOrigin: "center center",
		});
		tl.to(
			img,
			{
				scale: 1,
				x: 0,
				y: 0,
				rotation: 0,
				duration: 6,
				ease: "power1.inOut",
				opacity: 1,
				stagger: 4,
			},
			0
		);
		tl.to(
			img,
			{
				width: original.width,
				height: original.height,
				duration: 6,
				ease: "power1.inOut",
			},
			expandOffset
		);
	});
	tl.from(
			textSplit.words,
			{
				yPercent: 100,
				opacity: 0,
				stagger: 0.15,
				ease: "power2.out",
				duration: 0.6,
			},
			0
		);

	ScrollTrigger.create({
		trigger: trigger,
		start: "top top",
		end: "bottom bottom",
		scrub: true,
		markers: true,
		animation: tl,
	});
}
