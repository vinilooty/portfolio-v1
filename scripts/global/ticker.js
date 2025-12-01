import { gsap } from "gsap";

export default function initTicker() {
  const tickers = document.querySelectorAll(".ticker");

  tickers.forEach((ticker) => {
    const inner = ticker.querySelector(".ticker__wrapper");
    if (!inner) return;

    const items = Array.from(inner.children);
    const direction = ticker.dataset.direction;
    const initDuration = parseFloat(ticker.dataset.duration) || 20;
    const slowDuration = 60;

    // Clone and append/prepend items for seamless looping
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      inner.appendChild(clone);
    });

    const distance = inner.scrollWidth / 2;
    let startX = 0;
    let endX = 0;

    if (direction === "left") {
      startX = 0;
      endX = -distance;
    } else if (direction === "right") {
      startX = 0;
      endX = distance;
    }

    gsap.set(inner, { x: startX });

    const tickerTween = gsap.to(inner, {
      x: endX,
      duration: initDuration,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        gsap.set(inner, { x: startX });
      },
    });

    // Pause/Slow on hover
    ticker.addEventListener("mouseenter", () => {
      const slowScale = initDuration / slowDuration;
      gsap.to(tickerTween, {
        timeScale: slowScale,
        duration: 0.5,
        ease: "power1.out",
      });
    });
    ticker.addEventListener("mouseleave", () => {
      gsap.to(tickerTween, { timeScale: 1, duration: 0.5, ease: "power1.out" });
    });

    // Item hover effect
    const allItems = Array.from(inner.children);
    allItems.forEach((item) => {
      const media = item.querySelector(".ticker__item-media");
      if (!media) return;
      item.addEventListener("mouseenter", () => {
        gsap.to(media, {
          borderRadius: "0rem",
          duration: 0.5,
          scale: 1.1,
          ease: "power1.out",
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(media, {
          borderRadius: "3rem",
          duration: 0.5,
          scale: 1,
          ease: "power1.out",
        });
      });
    });
  });
}