import { describe, it, expect } from "vitest";
import { capitalize } from "./string.utils";

describe("capitalize", () => {
  it("should capitalize the first letter and lowercase the rest", () => {
    expect(capitalize("hELLO")).toBe("Hello");
  });

  it("should handle already capitalized strings", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("should handle all uppercase strings", () => {
    expect(capitalize("HELLO")).toBe("Hello");
  });

  it("should handle all lowercase strings", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("should handle mixed case like TuToRiaL", () => {
    expect(capitalize("TuToRiaL")).toBe("Tutorial");
  });

  it("should return empty string when value is empty", () => {
    expect(capitalize("")).toBe("");
  });
});
