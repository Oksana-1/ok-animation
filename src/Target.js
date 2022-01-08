import { HeightAnimation } from "./Animations.js";

export const Target = {
	targetElement: null,
	isActive() {
		if (!this.targetElement) return false;
		const stateAttr = this.targetElement.getAttribute("data-state");
		return Boolean(stateAttr && stateAttr === "active");
	},
	animate() {
		this.isActive() ? this.animateBackward() : this.animateForward();
	},
	animateForward() {
		const heightAnimation = Object.create(HeightAnimation);
		heightAnimation.init(this.targetElement);
		return new Promise((resolve) => {
			heightAnimation.slideDown().then(() => {
				this.targetElement.setAttribute("data-state", "active");
				resolve();
			});
		});
	},
	animateBackward() {
		const heightAnimation = Object.create(HeightAnimation);
		heightAnimation.init(this.targetElement);
		return new Promise((resolve) => {
			heightAnimation.slideUp().then(() => {
				this.targetElement.removeAttribute("data-state");
				resolve();
			});
		});
	},
	init(targetElement) {
		this.targetElement = targetElement;
	}
}