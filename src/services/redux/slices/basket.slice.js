import { createSlice } from "@reduxjs/toolkit";

//Utility Functions
// pure functions to generate cart items
const doesBasketItemExist = (basketItems, itemToSearch) => {
  if (basketItems) {
    const existingbasketItem = basketItems.find((basketItem) => {
      return basketItem._id === itemToSearch._id;
    });
    if (existingbasketItem) return true;
  }

  return false;
};

export const getBasketItem = (basketItems, menuItem) => {
  if (basketItems) {
    return basketItems.find((basketItem) => basketItem._id === menuItem._id);
  }

  return false;
};

export const addBasketItem = (basketItems, itemToAdd) => {
  if (doesBasketItemExist(basketItems, itemToAdd)) {
    return basketItems.map((basketItem) =>
      basketItem._id === itemToAdd._id
        ? { ...basketItem, quantity: basketItem.quantity + 1 }
        : basketItem
    );
  }

  return [...basketItems, { ...itemToAdd, quantity: 1 }];
};

export const removeBasketItem = (basketItems, basketItemToRemove) => {
  if (doesBasketItemExist(basketItems, basketItemToRemove)) {
    return basketItems.filter((item) => item._id !== basketItemToRemove._id);
  }
  return basketItems;
};

export const reduceBasketItem = (basketItems, basketItemToReduce) => {
  if (doesBasketItemExist(basketItems, basketItemToReduce)) {
    if (basketItemToReduce.quantity === 1) {
      return removeBasketItem(basketItems, basketItemToReduce);
    }

    return basketItems.map((basketItem) => {
      if (basketItem._id === basketItemToReduce._id) {
        return { ...basketItem, quantity: basketItem.quantity - 1 };
      }
      return basketItem;
    });
  }
  return basketItems;
};

export const calculateBasketTotalQuantity = (basketItems) => {
  if (basketItems) {
    return basketItems.reduce((total, currentItem) => {
      return Number(total) + Number(currentItem.quantity);
    }, 0);
  } else {
    return 0;
  }
};

export const calculateBasketTotal = (basketItems) => {
  if (basketItems) {
    return basketItems.reduce((total, currentItem) => {
      return (
        Number(total) + Number(currentItem.quantity) * Number(currentItem.price)
      );
    }, 0);
  } else {
    return 0.0;
  }
};

export const getItemQuantity = (basketItems, itemToSearch) => {
  if (doesBasketItemExist(basketItems, itemToSearch)) {
    // if the item exists in the basket return the value
    const existingbasketItem = basketItems.find((basketItem) => {
      return basketItem._id === itemToSearch._id;
    });
    return existingbasketItem.quantity;
  }
  return 0;
};

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = addBasketItem(state.items, action.payload);
    },
    reduceItem: (state, action) => {
      const updatedBasketItems = reduceBasketItem(state.items, action.payload);
      if (updatedBasketItems) {
        //  becaue we cannot set it to undefined
        state.items = [...updatedBasketItems];
      } else {
        state.items = [];
      }
    },
    removeItem: (state, action) => {
      state.items = removeBasketItem(state.items, action.payload);
    },
  },
});

export const { addItem, reduceItem, removeItem } = basketSlice.actions;

export default basketSlice.reducer;
