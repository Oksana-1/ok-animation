import { HeightAnimation } from "../src/Animations";

const createTestTarget = () => {
  const target = document.createElement("div");
  target.style.height = "100px";
  return target;
};
let testTarget;
let testAnimation;

describe("General animations", () => {
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
  it("`clearStyles` works properly for `slideUp`", () => {
    testTarget.style.overflow = "scroll";
    testAnimation.clearStyles("slideUp");
    expect(testTarget.style.overflow).toBeFalsy();
    expect(testTarget.style.height).toBeFalsy();
    expect(testTarget.style.display).toBe("none");
  });
});
