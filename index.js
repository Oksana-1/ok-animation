import { AnimationHandler } from "./src/AnimationHandler.js";
const animationHandler = Object.create(AnimationHandler);
animationHandler.init();
animationHandler.listen("click");