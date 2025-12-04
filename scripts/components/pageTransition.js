import { gsap } from "gsap";

gsap.to(
    ".load__grid-item",
    {
        opacity: 0,
        duration: 0.11,
        stagger: { amount: 0.6, from: "random" },
        onComplete:()=>{gsap.set(".load__grid", { display: "none" });}
    }
);

export function pageTransition() {
    const allLinks = document.querySelectorAll("a[href]");
    allLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            if (
                link.hostname === window.location.hostname
                && link.hash.length === 0
                && link.target !== "_blank"
            ) {
                e.preventDefault();
                let destination = link.href;

                gsap.set(".load__grid", { display: "grid" });
                gsap.fromTo(
                    ".load__grid-item",
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.1,
                        stagger: { amount: 0.6, from: "random" },
                        onComplete: () => { window.location.href = destination },
                    }
                );
            }
        });
    });
}