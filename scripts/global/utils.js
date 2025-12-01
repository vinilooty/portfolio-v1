let scrollY = 0;

export function lockScroll() {
	scrollY = window.scrollY;
	document.body.classList.add("is-nav-open");
	document.body.style.top = `-${scrollY}px`;
}

export function unlockScroll() {
	document.body.classList.remove("is-nav-open");
	window.scrollTo(0, scrollY);
}
