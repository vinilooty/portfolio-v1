"use strict";
//Utility Imports
//---gsap
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
//---lenis
import Lenis from "lenis";
//---Swiper JS
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
//---Swiper styles
import "swiper/css/bundle";
//Plugins Registration
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
//Module Imports
import initCursor from "@globals/cursor.js";
import initMenu from "@globals/menu.js";
import { initButtonInteractions } from "@globals/buttonLogic.js";
import initSmoothScroll from "@globals/lenis.js";
import { footerAnimations } from "@anim/animations.js";
import { scrollIndicator } from "@anim/animations.js";

//pages
import { homePage } from "@pages/homePage.js";
import { projectsPage } from "@pages/projectsPage.js";

//Main App
window.Webflow ||= [];
window.Webflow.push(() => {
	const page = document.body.dataset.page;

	initSmoothScroll();
	initButtonInteractions();
	initCursor();
	initMenu();
	footerAnimations();
	scrollIndicator();
	switch (page) {
		case "home":
			homePage();
			break;
		case "projects":
			projectsPage();
			break;
	}
});
