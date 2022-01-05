import { Animations } from "../src/Animations";

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
    expect(Animations.slideUp(testTarget) instanceof Promise).toBe(true);
  });
	it("slideDown function returns Promise", () => {
    expect(Animations.slideDown(testTarget) instanceof Promise).toBe(true);
  });
});
