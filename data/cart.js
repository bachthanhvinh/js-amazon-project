export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(productId) {
  let matchingItem;
  const quantityElement = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantityElement.value);

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}
export function removeFromcart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity(link) {
  let Quantity = 0;
  cart.forEach((CartItem) => {
    Quantity += CartItem.quantity;
  });

  if (link === ".js-return-to-home-link") {
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${Quantity} item`;
  } else if (link === ".js-cart-quantity") {
    document.querySelector(".js-cart-quantity").innerHTML = Quantity;
  }
}

export function updateQuantity(productId, newQuantity) {
  let matchingProductId;
  cart.forEach((cartId) => {
    if (productId === cartId.productId) {
      matchingProductId = cartId;
    }
  });

  matchingProductId.quantity = newQuantity;

  saveToStorage();
}
