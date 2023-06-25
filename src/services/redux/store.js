import { configureStore } from "@reduxjs/toolkit";

import BasketReducer from "../redux/slices/basket.slice";
import RestaurantSlice from "../redux/slices/restaurant.slice";

export const store = configureStore({
  reducer: {
    basket: BasketReducer,
    restaurant: RestaurantSlice,
  },
});
