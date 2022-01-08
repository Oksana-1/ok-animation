import {exist, runAnimation} from "./utils/helpers.js";

export const HeightAnimation = {
  targetElement: null,
  fullHeight: 0,
  duration: 500,
  clearStylesAfterAnimation(hideBlock = false) {
    if (hideBlock) this.targetElement.style.display = "none";
    this.targetElement.style.removeProperty("height");
    this.targetElement.style.removeProperty("overflow");
  },
  setStylesBeforeSlideUp() {
    this.targetElement.style.height = this.fullHeight + "px";
    this.targetElement.style.overflow = "hidden";
  },
  setStylesBeforeSlideDown() {
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
  },
  oneStepSlideUpAnimate(progressAnimation) {
    this.targetElement.style.height =
      this.fullHeight - (this.fullHeight * progressAnimation) / this.duration + "px";
  },
  oneStepSlideDownAnimate(progressAnimation) {
    this.targetElement.style.height = (this.fullHeight * progressAnimation) / this.duration + "px";
  },
  slideUp() {
    return new Promise((resolve) => {
      this.setStylesBeforeSlideUp();
      runAnimation({
        duration: this.duration,
        animateOneStep: (progressAnimation) => {
          this.oneStepSlideUpAnimate(progressAnimation);
        },
      }).then(() => {
        this.clearStylesAfterAnimation(true);
        resolve();
      });
    });
  },
  slideDown() {
    return new Promise((resolve) => {
      this.setStylesBeforeSlideDown();
      runAnimation({
        duration: this.duration,
        animateOneStep: (progressAnimation) => {
          this.oneStepSlideDownAnimate(progressAnimation);
        },
      }).then(() => {
        this.clearStylesAfterAnimation();
        resolve();
      });
    });
  },
  init(target,duration) {
    if (!exist(target)) throw new Error("Animation target was not found in DOM!");
    this.targetElement = target;
    this.fullHeight = target.scrollHeight;
    if (duration) this.duration = duration;
  }
};
