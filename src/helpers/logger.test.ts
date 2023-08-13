import { createTypedLogger } from "./logger";

describe("logger", () => {
  const moduleName = "test";
  const logger = createTypedLogger(moduleName);
  const consoleSpy = jest.spyOn(console, "log");

  beforeEach(() => {
    const modeule_name = "test";
  });

  it("should log info", () => {
    logger.info("test");
    expect(consoleSpy).toHaveBeenCalledWith({
      moduleName,
      message: "test",
      data: {},
    });
  });


  it("should log warn", () => {
    logger.warn("test");
    expect(consoleSpy).toHaveBeenCalledWith({
      moduleName,
      message: "test",
      data: {},
    });
  });

  it("should log warn with error", () => {
    logger.warn({ msg: "test", error: new Error("test") });
    expect(consoleSpy).toHaveBeenCalledWith({
      moduleName,
      message: "test",
      data: { error: "test" },
    });
  });

  it("should log error", () => {
    logger.error("test");
    expect(consoleSpy).toHaveBeenCalledWith({
      moduleName,
      message: "test",
      data: {},
      err: new Error("test"),
    });
  });

  it("should log error with error", () => {
    logger.error({ msg: "test", error: new Error("test") });
    expect(consoleSpy).toHaveBeenCalledWith({
      moduleName,
      message: "test",
      data: {},
      err: new Error("test"),
    });
  });
});
