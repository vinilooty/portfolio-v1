import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function philosophySection() {
	gsap.registerPlugin(ScrollTrigger, SplitText);

	const images = gsap.utils.toArray(".philosophy__media-wrap");
	const text = document.querySelector(".philosophy__p");
	const trigger = document.querySelector(".laptop-track");

	const textSplit = new SplitText(text, { type: "lines, words", mask: "words" });

	const motionOffsets = [
		{ x: "-40vw", y: "-80vw", rotation: -120 },
		{ x: "40vw", y: "-70vw", rotation: 90 },
		{ x: "-5vw", y: "-80vw", rotation: 180 },
		{ x: "15vw", y: "-60vw", rotation: -90 },
		{ x: "-12vw", y: "-85vw", rotation: 60 }
	];

	const expandStartOffsets = [0, 0.2, 0.35, 0.55, 0.8];

	const tl = gsap.timeline();

	images.forEach((img, i) => {
		const motion = motionOffsets[i % motionOffsets.length];
		const expandOffset = expandStartOffsets[i % expandStartOffsets.length];

		const originalWidth = img.offsetWidth;
		const originalHeight = img.offsetHeight;

		gsap.set(img, {
			x: motion.x,
			y: motion.y,
			rotation: motion.rotation,
			scale: 0.1,
			opacity: 0,
			transformOrigin: "center center"
		});

		tl.to(
			img,
			{
				scale: 1,
				x: 0,
				y: 0,
				rotation: 0,
				opacity: 1,
				duration: 3,
				ease: "power2.inOut"
			},
			0
		);

		tl.fromTo(
			img,
			{ width: 80, height: 80 },
			{
				width: originalWidth,
				height: originalHeight,
				duration: 3,
				ease: "power2.inOut"
			},
			expandOffset
		);
	});

	tl.from(
		textSplit.words,
		{
			yPercent: 100,
			opacity: 0,
			stagger: 0.1,
			ease: "power2.out",
			duration: 0.6
		},
		0
	);

	ScrollTrigger.create({
		trigger: trigger,
		start: "top top",
		end: "bottom bottom",
		scrub: true,
		animation: tl
	});
}
