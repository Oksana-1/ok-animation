import { Target } from "./Target.js";

export const Trigger = {
  triggerElement: null,
  targetElement: null,
  animate() {
    this.triggerElement.classList.toggle("active");
  },
  init(triggerElement) {
    this.triggerElement = triggerElement;
    this.defineTargetElement();
  },
  listen(event) {
    document.addEventListener(event, async () => {
      const target = Object.create(Target);
      target.init(this.targetElement);
      await target.animate();
      this.animate();
    });
  },
  defineTargetElement() {
    const animationId = this.triggerElement.getAttribute(
      "data-animate-trigger"
    );
    if (!animationId)
      throw new Error(
        "Animation trigger need `data-animate-trigger` attribute!"
      );
    const targetElement = document.querySelector(
      `[data-animate-target="${animationId}"]`
    );
    if (!targetElement)
      throw new Error(
        "Animation target need same `data-animate-target` attribute as on trigger!"
      );
    this.targetElement = targetElement;
  },
};
