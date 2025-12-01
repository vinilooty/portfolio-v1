import { initJourneySection } from "@sections/journeySection.js";
import initWordSwap from "@globals/wordSwap.js";
import initTicker from "@globals/ticker.js";
import { initVideoModal } from "@components/videoModal.js";
import { initSwiperSlider } from "@globals/swiperSlider.js";
import { valueSectionAnimations } from "@anim/animations.js";
import { journeySectionAnimation } from "@anim/animations.js";

export function homePage() {
	initJourneySection();
	initTicker();
	initWordSwap();
	initVideoModal();
	initSwiperSlider();
	valueSectionAnimations();
	journeySectionAnimation();
}
