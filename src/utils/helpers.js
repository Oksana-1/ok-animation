export const exist = (element) => {
  return typeof element === "undefined" || element === null
    ? false
    : element.length !== 0;
};
export const runAnimation = ({
  duration,
  animateOneStep,
  afterAnimationFn,
}) => {
  return new Promise((resolve) => {
    let startAnimation = null;
    function step(timestamp) {
      if (!startAnimation) startAnimation = timestamp;
      const progressAnimation = timestamp - startAnimation;
      animateOneStep();
      if (progressAnimation < duration) {
        window.requestAnimationFrame(step);
      } else {
        afterAnimationFn();
        resolve();
      }
    }
    window.requestAnimationFrame(step);
  });
};
