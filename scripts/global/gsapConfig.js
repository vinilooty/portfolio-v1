import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

export function customEases() {
	gsap.registerEase(
		"hop",
		"M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
	);
	gsap.registerEase(
		"loader",
		"M0,0 C0.126,0.382 0.506,0.405 0.587,0.574 0.666,0.741 0.818,1.001 1,1 "
	);
}