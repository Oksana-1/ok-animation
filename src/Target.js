import { HeightAnimation } from "./Animations.js";

export const Target = {
  targetElement: null,
  heightAnimation: null,
  duration: null,
  isActive() {
    if (!this.targetElement) return false;
    const stateAttr = this.targetElement.getAttribute("data-state");
    return Boolean(stateAttr && stateAttr === "active");
  },
  animate() {
    this.isActive() ? this.animateBackward() : this.animateForward();
  },
  animateForward() {
    return new Promise((resolve) => {
      this.heightAnimation.slideDown().then(() => {
        this.targetElement.setAttribute("data-state", "active");
        resolve();
      });
    });
  },
  animateBackward() {
    return new Promise((resolve) => {
      this.heightAnimation.slideUp().then(() => {
        this.targetElement.removeAttribute("data-state");
        resolve();
      });
    });
  },
  init(targetElement, duration) {
    this.targetElement = targetElement;
    this.duration = duration;
    this.heightAnimation = Object.create(HeightAnimation);
    this.heightAnimation.init(this.targetElement, this.duration);
  },
};
