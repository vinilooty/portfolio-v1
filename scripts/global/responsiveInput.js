
export const noHover = window.matchMedia("(hover: none), (pointer: coarse)").matches;


function adaptHoverToClick(el, onEnter, onLeave) {
  el.addEventListener("click", () => {
    const active = el.classList.toggle("is-active");
    if (active) onEnter();
    else onLeave();
  });
}

export function addResponsiveHover(el, onEnter, onLeave) {
  if (noHover) {
    adaptHoverToClick(el, onEnter, onLeave);
  } else {
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
  }
}
