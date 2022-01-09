export const Trigger = {
  triggerElement: null,
  target: null,
  animate() {
    this.triggerElement.classList.toggle("active");
    this.target.animate();
  },
  init(triggerElement, target) {
    this.triggerElement = triggerElement;
    this.target = target;
  },
};
