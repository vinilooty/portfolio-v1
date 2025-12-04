import { gsap } from "gsap";
import { approachCards } from "@sections/approachCards.js";
import { philosophySection } from "@sections/philosophySection.js"; 
import { bridgeSection } from "@sections/bridgeSection.js"; 
import { faqSection } from "@sections/faqSection.js";
export function approachPage() {
	//declarations
    approachCards();
    philosophySection();
    bridgeSection();
    faqSection();
}
