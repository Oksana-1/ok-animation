import { HeightAnimation } from "../src/Animations";
const heightAnimation =  Object.create(HeightAnimation);

const createTestTarget = () => {
  const target = document.createElement("div");
  target.style.height = "100px";
  return target;
}
let testTarget;

describe("General animations", () => {
  beforeEach(() => {
    testTarget = createTestTarget();
  });
  afterEach(() => {
    testTarget = undefined;
  })
  it("slideUp function returns Promise", () => {
    expect(heightAnimation.slideUp(testTarget) instanceof Promise).toBe(true);
  });
	it("slideDown function returns Promise", () => {
    expect(heightAnimation.slideDown(testTarget) instanceof Promise).toBe(true);
  });
  it("`clearStylesAfterAnimation` works properly without `hideBlock` argument", () => {
    testTarget.style.overflow = "scroll";
    heightAnimation.clearStylesAfterAnimation(testTarget);
    expect(testTarget.style.overflow).toBeFalsy();
    expect(testTarget.style.height).toBeFalsy();
  });
  it("`clearStylesAfterAnimation` works properly with `hideBlock` true", () => {
    testTarget.style.overflow = "scroll";
    heightAnimation.clearStylesAfterAnimation(testTarget, true);
    expect(testTarget.style.overflow).toBeFalsy();
    expect(testTarget.style.height).toBeFalsy();
    expect(testTarget.style.display).toBe("none");
  });
});
