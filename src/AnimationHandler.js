import { exist } from "./utils/helpers.js";
import { Trigger } from "./Trigger.js";

export const AnimationHandler = {
  triggers: [],
  init() {
    const triggers = document.querySelectorAll("[data-animate-trigger]");
    if (exist(triggers)) this.triggers = Array.from(triggers);
  },
  listen(event) {
    this.triggers.forEach((trigger) => {
      const activeTrigger = Object.create(Trigger);
      activeTrigger.init(trigger);
      activeTrigger.listen(event);
    });
  },
};
