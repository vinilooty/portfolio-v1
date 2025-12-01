import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function initSmoothScroll() { 

const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}