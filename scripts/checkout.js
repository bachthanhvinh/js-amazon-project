import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProduct } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";
loadProduct(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
