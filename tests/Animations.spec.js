import { Animations } from "../src/Animations";

const testTarget = document.createElement("div");
testTarget.style.height = "100px";

describe("General animations", () => {
  it("slideUp function returns Promise", () => {
    expect(Animations.slideUp(testTarget) instanceof Promise).toBe(true);
  });
	it("slideDown function returns Promise", () => {
    expect(Animations.slideDown(testTarget) instanceof Promise).toBe(true);
  });
});
