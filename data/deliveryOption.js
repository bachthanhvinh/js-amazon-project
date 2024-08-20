import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
  const dayofWeek = date.format("dddd");

  return dayofWeek === "Saturday" || dayofWeek === "Sunday";
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDate = deliveryOption.deliveryDays;

  let deliveryDate = dayjs();

  while (remainingDate > 0) {
    deliveryDate = deliveryDate.add(1, "days");

    if (!isWeekend(deliveryDate)) {
      remainingDate--;
    }
  }
  // const today = dayjs();

  // const deliveryDay = today.add(deliveryOption.deliveryDays, "days");

  const DateString = deliveryDate.format("dddd , MMMM D");

  return DateString;
}

export function validDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      found = true;
    }
  });
  return found;
}
