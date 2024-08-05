import {
  cart,
  removeFromcart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function renderOrderSummary() {
  let CartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingproduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingproduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

    const dateString = deliveryDate.format("dddd, MMMM D");

    CartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${
        matchingproduct.id
      }">
              <div class="delivery-date">Delivery date: ${dateString} </div>
  
              <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${matchingproduct.image}"
                />
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingproduct.name}
                  </div>
                  <div class="product-price">$${formatCurrency(
                    matchingproduct.priceCents
                  )}</div>
                  <div class="product-quantity">
                    <span> Quantity: <span class="quantity-label js-quantity-label-${
                      matchingproduct.id
                    }">${cartItem.quantity}</span> </span>
                    <span class="update-quantity-link link-primary
                    js-update-link 
                    "
                    data-product-id='${matchingproduct.id}'
                    >
                      Update
                    </span>
                    <input class='quantity-input js-quantity-input-${
                      matchingproduct.id
                    } input-${matchingproduct.id}'
                    data-product-id="${matchingproduct.id}";
                    >
  
                    <span class='save-quantity-link link-primary 
                    js-save-link
                    '
                    data-product-id='${matchingproduct.id}'
                    >Save</span>
                   
                    <span class="delete-quantity-link link-primary 
                    js-delete-link" 
                    data-product-id= '${matchingproduct.id}'>
                      Delete
                    </span>
                  </div>
                </div>
             <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingproduct, cartItem)}
                 
                </div>
              </div>
            </div>
     `;
  });

  function deliveryOptionsHTML(matchingproduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
       <div class="delivery-option js-delivery-option"
          data-product-id='${matchingproduct.id}'
          data-delivery-Option-id='${deliveryOption.id}'
            >
                    <input
                      type="radio"
                      ${isChecked ? "checked" : ""}
                      class="delivery-option-input"
                      name="delivery-option-${matchingproduct.id}"
                    />
                    <div>
                      <div class="delivery-option-date">
                      ${dateString}
                      </div>
                      <div class="delivery-option-price">
                      ${priceString}  Shipping
                      </div>
                    </div>
                  </div>
               
      `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = CartSummaryHTML;

  // document.querySelector(".js-checkout-cart").innerHTML = quantity;
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      removeFromcart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.remove();

      calculateCartQuantity(".js-return-to-home-link");
    });
  });

  calculateCartQuantity(".js-return-to-home-link");

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.classList.add("is-editing-quantity");

      const input = document.querySelector(`.input-${productId}`);
      input.focus();
    });
  });

  let updatenewQuantity;
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      inputQuantity(link);
    });
  });

  // event.key === Enter
  document.querySelectorAll(".quantity-input").forEach((link) => {
    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        inputQuantity(link);
      }
    });
  });

  function inputQuantity(link) {
    const { productId } = link.dataset;

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    container.classList.remove("is-editing-quantity");

    const inputQuantity = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(inputQuantity.value);

    if (newQuantity <= 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }
    updateQuantity(productId, newQuantity);

    calculateCartQuantity(".js-return-to-home-link");

    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );

    quantityLabel.innerHTML = newQuantity;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
    });
  });
}
