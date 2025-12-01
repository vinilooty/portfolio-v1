
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


window.closeModal = closeModal;

function openModal(heroModal, iframe, originalSrc) {
  gsap.to(heroModal, {
    display: "flex",
    opacity: 1,
    onComplete: () => {
      const autoplaySrc = originalSrc.replace(
        "autoplay=false",
        "autoplay=true"
      );
      iframe.src = autoplaySrc;
    },
  });
  if (typeof window.lockScroll === "function") window.lockScroll();
}

function closeModal(heroModal, iframe, originalSrc) {
  gsap.to(heroModal, {
    opacity: 0,
    onComplete: () => {
      heroModal.style.display = "none";
      iframe.src = ""; 
      iframe.src = originalSrc;
    },
  });
  if (typeof window.unlockScroll === "function") window.unlockScroll();
}

export function initVideoModal() {
  const heroModal = document.querySelector(".video__modal");
  const heroMedia = document.querySelector(".hero__media");
  const iframeEl = document.querySelector("#heroVideoId iframe");
  const outerModal = document.querySelector(".modal__outer");
  const cursor = document.querySelector(".cursor");

  if (!heroModal || !heroMedia || !iframeEl || !outerModal) {
    console.warn("Video modal elements missing. Skipping video modal init.");
    return;
  }

  const originalSrc = iframeEl.src;
  gsap.set(heroModal, { opacity: 0, display: "none" });

  // Update global functions to pass modal context
  window.openModal = () => openModal(heroModal, iframeEl, originalSrc);
  window.closeModal = () => closeModal(heroModal, iframeEl, originalSrc);

  heroMedia.addEventListener("click", window.openModal);
  outerModal.addEventListener("click", window.closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      window.closeModal();
    }
  });

  
  // Hero Video Scroll Animation
  gsap.to(heroMedia, {
    scale: 0.8,
    borderRadius: "1rem",
    scrollTrigger: {
      trigger: heroMedia,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}
