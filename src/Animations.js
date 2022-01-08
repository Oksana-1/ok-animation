export const HeightAnimation = {
  clearStylesAfterAnimation(target, hideBlock = false) {
    if (hideBlock) target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
  },
  setStylesBeforeSlideUp(target, height) {
    target.style.height = height + "px";
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
  slideUp (target, duration = 500) {
    return new Promise((resolve) => {
      //remember full height
      const height = target.scrollHeight;
      this.setStylesBeforeSlideUp(target, height);
      // set final styles
      let startAnimation = null;
      const step = (timestamp) => {
        if (!startAnimation) {
          startAnimation = timestamp;
        }
        const progressAnimation = timestamp - startAnimation;
        target.style.height =
          height - (height * progressAnimation) / duration + "px";
        if (progressAnimation < duration) {
          window.requestAnimationFrame(step);
        } else {
          this.clearStylesAfterAnimation(target, true);
          resolve();
        }
      }
      window.requestAnimationFrame(step);
    });
  },
  slideDown (target, duration = 500) {
    return new Promise((resolve) => {
      this.setStylesBeforeSlideDown(target);
      //remember full height
      const height = target.scrollHeight;
      //set final styles
      let startAnimation = null;
      function step(timestamp) {
        if (!startAnimation) {
          startAnimation = timestamp;
        }
        const progressAnimation = timestamp - startAnimation;
        target.style.height = (height * progressAnimation) / duration + "px";
        if (progressAnimation < duration) {
          window.requestAnimationFrame(step);
        } else {
          this.clearStylesAfterAnimation(target);
          resolve();
        }
      }
      window.requestAnimationFrame(step);
    });
  },
};
