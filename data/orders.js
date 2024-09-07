export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  savaStorage();
}

function savaStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
