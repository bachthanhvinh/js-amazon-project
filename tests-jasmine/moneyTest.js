import formatCurrency from "../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("converts cents into dollars", () => {
    expect(formatCurrency(1250)).toEqual("12.50");
  });
  it("Works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("round up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
