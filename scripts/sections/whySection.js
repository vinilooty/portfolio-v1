import { gsap } from "gsap"
import {customEases} from "@globals/gsapConfig.js"
export function whySection() {
    customEases();
    const items = document.querySelectorAll(".approach__philosophy-list-item");

    items.forEach((item) => {
        const hoverEl = item.querySelector(".element-hover");
        item.addEventListener("mouseenter", () => {
            gsap.to(hoverEl, {height: "100%", duration: 0.5, ease:"hop"})
        })
        item.addEventListener("mouseleave", () => {
            gsap.to(hoverEl, {height: "0%", duration: 0.5, ease:"hop"})
        })
    })
}