import { HeightAnimation } from "./src/Animations.js";

const heightAnimation = Object.create(HeightAnimation);
const trigger = document.getElementById("animateHeight");
const target = document.querySelector('[data-animate-height="animateHeight"]');
console.log(trigger);
trigger.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("CLICK!");
  heightAnimation.init(target);
  heightAnimation.slideUp().then(() => {
    console.log("DONE!");
  });
});