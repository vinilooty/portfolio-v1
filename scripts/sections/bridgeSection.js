import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { customEases } from "@globals/gsapConfig.js";
import { lenisRef } from "@globals/lenis.js";

export function bridgeSection() {

 
  document.fonts.ready.then(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {

        gsap.registerPlugin(ScrollTrigger, SplitText);
        customEases();

        const role = document.querySelector(".bridge-gap.is-role");
        const bridge = document.querySelector(".bridge-gap.is-bridge");
        const that = document.querySelector(".bridge-gap.is-that");
        const gap = document.querySelector(".bridge-gap.is-gap");
        const trigger = document.querySelector(".bridge-track");

        if (!role || !bridge || !that || !gap || !trigger) return;

       
        const roleSplit = new SplitText(role, { type: "words" });
        const bridgeSplit = new SplitText(bridge, { type: "words" });
        const thatSplit = new SplitText(that, { type: "words" });
        const gapSplit = new SplitText(gap, { type: "chars" });

        gsap.set([role, bridge, that, gap], { opacity: 1 });

       
        gsap.set(role,   { y: "-10vh" });
        gsap.set(bridge, { y: "0vh" });
        gsap.set(that,   { y: "10vh" });
        gsap.set(gap,    { y: "20vh" });

        gsap.set([roleSplit.words, bridgeSplit.words, thatSplit.words], {
          xPercent: -100,
          opacity: 0,
        });

        gsap.set(gapSplit.chars, {
          xPercent: -100,
          opacity: 0,
        });

        const tl = gsap.timeline({ ease: "power1.inOut" });

        tl.to(roleSplit.words, {
          xPercent: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.7
        });

        tl.to(bridgeSplit.words, {
          xPercent: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.7
        }, "<0.15");

        tl.to(thatSplit.words, {
          xPercent: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.7
        }, "<0.15");

        tl.to(gapSplit.chars, {
          xPercent: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.7
        }, "<0.2");

        tl.to(gap, { letterSpacing: "18vw", duration: 1.2 }, "+=0.2");

        ScrollTrigger.create({
          trigger,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          animation: tl,
        });

       
        ScrollTrigger.refresh();

      });
    });
  });
}
