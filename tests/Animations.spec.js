import { HeightAnimation } from "../src/Animations";

const createTestTarget = () => {
  const target = document.createElement("div");
  target.style.height = "100px";
  return target;
};
let testTarget;
let testAnimation;

describe("Animations tests", () => {
  beforeEach(() => {
    testAnimation = Object.create(HeightAnimation);
    testTarget = createTestTarget();
    testAnimation.init(testTarget);
  });
  afterEach(() => {
    testTarget = undefined;
    testAnimation = undefined;
  });
  it("slideUp function returns Promise", () => {
    expect(testAnimation.slideUp() instanceof Promise).toBe(true);
  });
  it("slideDown function returns Promise", () => {
    expect(testAnimation.slideDown() instanceof Promise).toBe(true);
  });
  it("`clearStyles` works properly for `slideDown` animation", () => {
    testTarget.style.overflow = "scroll";
    testAnimation.clearStyles("slideDown");
    expect(testTarget.style.overflow).toBeFalsy();
    expect(testTarget.style.height).toBeFalsy();
  });
  it("`clearStyles` works properly for `slideUp` animation", () => {
    testTarget.style.overflow = "scroll";
    testAnimation.clearStyles("slideUp");
    expect(testTarget.style.overflow).toBeFalsy();
    expect(testTarget.style.height).toBeFalsy();
    expect(testTarget.style.display).toBe("none");
  });
  it.todo("`clearStyles` throws error if wrong animationName given");
  it.todo("`setInitialStyles` works properly for `slideDown` animation");
  it.todo("`setInitialStyles` works properly for `slideUp` animation");
  it.todo("`setInitialStyles` throws error if wrong animationName given");
  it.todo("`init` throws error if no target passed");
  it.todo("`init` defines `targetElement`, `fullHeight` and `duration` correctly");
  it.todo("`oneStepAnimate` works properly for `slideDown` animation");
  it.todo("`oneStepAnimate` works properly for `slideUp` animation");
  it.todo("`oneStepAnimate` throws error if wrong animationName given");
  it.todo("`slideUp` animates height of element from 100% to 0");
  it.todo("`slideDown` animates height of element from 0 to  100%");
});
