import { runAnimation } from "./utils/helpers.js";

export const HeightAnimation = {
  clearStylesAfterAnimation(target, hideBlock = false) {
    if (hideBlock) target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
  },
  setStylesBeforeSlideUp(target, fullHeight) {
    target.style.height = fullHeight + "px";
    target.style.overflow = "hidden";
  },
  setStylesBeforeSlideDown(target) {
    //Check if already shown
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;
    if (display === "none") {
      display = "block";
    }
    target.style.display = display;
    //set start styles
    target.style.height = "0";
    target.style.overflow = "hidden";
  },
  oneStepSlideUpAnimate(progressAnimation, { target, fullHeight, duration }) {
    target.style.height =
      fullHeight - (fullHeight * progressAnimation) / duration + "px";
  },
  oneStepSlideDownAnimate(progressAnimation, { target, fullHeight, duration }) {
    target.style.height = (fullHeight * progressAnimation) / duration + "px";
  },
  slideUp(target, duration = 500) {
    return new Promise((resolve) => {
      const fullHeight = target.scrollHeight;
      this.setStylesBeforeSlideUp(target, fullHeight);
      runAnimation({
        duration,
        animateOneStep: (progressAnimation) => {
          this.oneStepSlideUpAnimate(progressAnimation, {
            target,
            fullHeight,
            duration,
          });
        },
        afterAnimationCallback: () => {
          this.clearStylesAfterAnimation(target, true);
        },
      }).then(() => resolve());
    });
  },
  slideDown(target, duration = 500) {
    return new Promise((resolve) => {
      this.setStylesBeforeSlideDown(target);
      const fullHeight = target.scrollHeight;
      runAnimation({
        duration,
        animateOneStep: (progressAnimation) => {
          this.oneStepSlideDownAnimate(progressAnimation, {
            target,
            fullHeight,
            duration,
          });
        },
        afterAnimationCallback: () => {
          this.clearStylesAfterAnimation(target);
        },
      }).then(() => resolve());
    });
  },
};
