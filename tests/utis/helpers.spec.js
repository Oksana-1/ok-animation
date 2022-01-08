import { runAnimation } from "../../src/utils/helpers";

const noop = () => {};
describe("helper `runAnimation`", () => {
  it("returns Promise", () => {
    expect(
      runAnimation({ duration: 1000, animateOneStep: noop }) instanceof Promise
    ).toBe(true);
  });
  it("uses requestAnimationFrame", async () => {
    const spyOnRaf = jest.spyOn(window, "requestAnimationFrame");
    await runAnimation({ duration: 1000, animateOneStep: noop });
    expect(spyOnRaf).toHaveBeenCalled();
    window.requestAnimationFrame.mockRestore();
  });
  it("requires integer duration as an argument", async () => {
    await expect(async () => {
      await runAnimation({ animateOneStep: noop });
    }).rejects.toThrowError();
    await expect(async () => {
      await runAnimation({ duration: "1000", animateOneStep: noop });
    }).rejects.toThrowError();
    await expect(async () => {
      await runAnimation({ duration: 500.5, animateOneStep: noop });
    }).rejects.toThrowError();
  });
  it("requires function animateOneStep as an argument", async () => {
    await expect(async () => {
      await runAnimation({ duration: 1000 });
    }).rejects.toThrowError();
    await expect(async () => {
      await runAnimation({ duration: 1000, animateOneStep: true });
    }).rejects.toThrowError();
    await expect(async () => {
      await runAnimation({ duration: 1000, animateOneStep: {} });
    }).rejects.toThrowError();
  });
});
