import { Target } from "./Target.js";

export const Trigger = {
  triggerElement: null,
  animate() {
    this.triggerElement.classList.toggle("active");
  },
  init(triggerElement) {
    this.triggerElement = triggerElement;
  },
  listen(event) {
    document.addEventListener(event, async (e) => {
      const animationId = e.target.getAttribute("data-animate-trigger");
      if (!animationId) throw new Error("Animation trigger need unique `data-animate-trigger` attribute!");
      const targetElement = document.querySelector(`[data-animate-target="${animationId}"]`);
      const target = Object.create(Target);
      target.init(targetElement);
      await target.animate();
      this.animate();
    })
  },
};