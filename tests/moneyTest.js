import formatCurrency from "../scripts/utils/money.js";

console.log("converts cents into dollars");
if (formatCurrency(1250) === "12.50") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("round up  to the nearest cent");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}
