import { exist, runAnimation } from "./utils/helpers.js";

export const HeightAnimation = {
  targetElement: null,
  fullHeight: 0,
  duration: 500,
  setInitialStyles(animationName) {
    switch (animationName) {
      case "slideUp":
        this.targetElement.style.height = this.fullHeight + "px";
        this.targetElement.style.overflow = "hidden";
        break;
      case "slideDown":
        //Check if already shown
        this.targetElement.style.removeProperty("display");
        let display = window.getComputedStyle(this.targetElement).display;
        if (display === "none") {
          display = "block";
        }
        this.targetElement.style.display = display;
        //set start styles
        this.targetElement.style.height = "0";
        this.targetElement.style.overflow = "hidden";
        break;
      default:
        throw new Error(`Animation name ${animationName} was not found!`);
    }
  },
  clearStyles(animationName) {
    if (animationName === "slideUp") this.targetElement.style.display = "none";
    this.targetElement.style.removeProperty("height");
    this.targetElement.style.removeProperty("overflow");
  },
  oneStepAnimate(progressAnimation, animationName) {
    switch (animationName) {
      case "slideUp":
        this.targetElement.style.height =
          this.fullHeight -
          (this.fullHeight * progressAnimation) / this.duration +
          "px";
        break;
      case "slideDown":
        this.targetElement.style.height =
          (this.fullHeight * progressAnimation) / this.duration + "px";
        break;
      default:
        throw new Error(`Animation name ${animationName} was not found!`);
    }
  },
  slideUp() {
    return new Promise((resolve) => {
      this.setInitialStyles("slideUp");
      runAnimation({
        duration: this.duration,
        animateOneStep: (progressAnimation) => {
          this.oneStepAnimate(progressAnimation, "slideUp");
        },
      }).then(() => {
        this.clearStyles("slideUp");
        resolve();
      });
    });
  },
  slideDown() {
    return new Promise((resolve) => {
      this.setInitialStyles("slideDown");
      runAnimation({
        duration: this.duration,
        animateOneStep: (progressAnimation) => {
          this.oneStepAnimate(progressAnimation, "slideDown");
        },
      }).then(() => {
        this.clearStyles("slideDown");
        resolve();
      });
    });
  },
  init(target, duration) {
    if (!exist(target))
      throw new Error("Animation target was not found in DOM!");
    this.targetElement = target;
    this.fullHeight = target.scrollHeight;
    if (duration) this.duration = duration;
  },
};
