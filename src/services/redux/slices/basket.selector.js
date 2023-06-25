import { createSelector } from "reselect";

import {
  calculateBasketTotalQuantity,
  calculateBasketTotal,
  getItemQuantity,
  getBasketItem,
} from "./basket.slice";

export const selectBasketFromStore = (state) => state.basket;

export const selectBasketItemQuantity = (dish) => (state) =>
  getItemQuantity(state.basket.items, dish);

export const selectBasketItem = (dish) => (state) =>
  getBasketItem(state.basket.items, dish);

export const selectBasketItems = createSelector(
  [selectBasketFromStore],
  (basket) => basket.items
);

export const selectBasketTotalQuantity = createSelector(
  [selectBasketItems],
  (basketItems) => calculateBasketTotalQuantity(basketItems)
);

export const selectBasketTotal = createSelector(
  [selectBasketItems],
  (basketItems) => calculateBasketTotal(basketItems)
);
