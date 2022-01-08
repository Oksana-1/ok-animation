export const exist = (element) => {
  return typeof element === "undefined" || element === null
    ? false
    : element.length !== 0;
};
export const runAnimation = ({ duration, animateOneStep }) => {
  return new Promise((resolve, reject) => {
    if (!duration || typeof duration !== "number" || !Number.isInteger(duration)) {
      reject(new Error(`duration is required and must be integer, ${duration} given!`));
    }
    if (!animateOneStep || typeof animateOneStep !== "function") {
      reject(new Error(`animateOneStep is required and must be function, ${typeof animateOneStep} given!`))
    }
    let startAnimation = null;
    function step(timestamp) {
      if (!startAnimation) startAnimation = timestamp;
      const progressAnimation = timestamp - startAnimation;
      animateOneStep(progressAnimation);
      progressAnimation < duration
        ? window.requestAnimationFrame(step)
        : resolve();
    }
    window.requestAnimationFrame(step);
  });
};
