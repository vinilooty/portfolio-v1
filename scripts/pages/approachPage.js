import { gsap } from "gsap";
import { approachCards } from "@sections/approachCards.js";
import { philosophySection } from "@sections/philosophySection.js";
import { faqSection } from "@sections/faqSection.js";
import { whySection } from "@sections/whySection.js";
export function approachPage() {
	//declarations
	approachCards();
	philosophySection();
	faqSection();
	whySection();
}
