import { gsap } from "gsap";
import { customEases } from "@globals/gsapConfig.js";
export function faqSection() {
	const faqBlock = document.querySelectorAll(".faq__item");

	faqBlock.forEach((item) => {
		customEases();
		const question = item.querySelector(".faq__question");
		const questionFill = item.querySelector(".question--fill");
		const answer = item.querySelector(".faq__answer-wrap");
		const answerText = item.querySelector(".faq__answer");

		item.addEventListener("click", () => {
			const answer = item.querySelector(".faq__answer-wrap");
			const isOpen = answer.classList.contains("is-open");

			document
				.querySelectorAll(".faq__answer-wrap.is-open")
				.forEach((openAnswer) => {
					if (openAnswer !== answer) {
						gsap.to(openAnswer, {
							height: 0,
							duration: 0.5,
							ease: "hop",
						});
						const parentItem = openAnswer.closest(".faq__item");
						const otherQuestion = parentItem.querySelector(".faq__question");
						const otherFill = parentItem.querySelector(".question--fill");

						gsap.to(otherFill, { width: 0, duration: 0.5, ease: "hop" });
						gsap.to(otherQuestion, { color: "#222" });
						openAnswer.classList.remove("is-open");
					}
				});

			if (isOpen) {
				gsap.to(answer, {
					height: 0,
					duration: 0.5,
					ease: "hop",
				});
				gsap.to(questionFill, { width: 0, duration: 0.5, ease: "hop" });
				gsap.to(question, { color: "#222" });
				answer.classList.remove("is-open");
			} else {
				gsap.set(answer, {
					height: "auto",
				});
				const fullHeight = answer.scrollHeight;
				gsap.fromTo(
					answer,
					{
						height: 0,
					},
					{
						height: fullHeight,
						duration: 0.5,
						ease: "hop",
					}
				);
				gsap.to(questionFill, { width: "100%", duration: 0.5, ease: "hop" });
				gsap.to(question, { color: "#FFFFFF" });
				answer.classList.add("is-open");
			}
		});
	});
}
