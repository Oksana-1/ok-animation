import { exist } from "./utils/helpers.js";
import { Trigger } from "./Trigger.js";
import { Target } from "./Target.js";

export const AnimationHandler = {
  triggers: [],
  activeTrigger: null,
  targetElement: null,
  duration: null,
  init() {
    const triggers = document.querySelectorAll("[data-animate-trigger]");
    if (exist(triggers)) this.triggers = Array.from(triggers);
  },
  listen(event) {
    this.triggers.forEach((trigger) => {
      document.addEventListener(event, async (e) => {
        this.activeTrigger = e.target;
        this.defineTargetElement();
        this.defineDuration();
        const activeTrigger = Object.create(Trigger);
        const target = Object.create(Target);
        target.init(this.targetElement, this.duration);
        activeTrigger.init(trigger, target);
        activeTrigger.animate();
      });
    });
  },
  defineTargetElement() {
    const animationId = this.activeTrigger.getAttribute("data-animate-trigger");
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
  defineDuration() {
    const durationId = this.targetElement.getAttribute("data-animate-duration");
    if (!durationId) return;
    this.duration = Number(durationId);
  }
};
