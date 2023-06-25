import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Currency from "react-currency-formatter";

import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

import {
  addItem,
  reduceItem,
  removeItem,
} from "../../../services/redux/slices/basket.slice";

import { urlFor } from "../../../services/sanity/sanity";

export const BasketItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeItemFromBasket = (item) => {
    dispatch(removeItem(item));
  };

  const reduceItemFromBasket = (item) => {
    dispatch(reduceItem(item));
  };

  const addItemToBasket = (item) => {
    dispatch(addItem(item));
  };

  return (
    <View
      key={item._id}
      className="flex-row items-center space-x-3 bg-white py-2 px-5"
    >
      <View className="flex-row items-center space-x-2 pb-3">
        <TouchableOpacity onPress={() => reduceItemFromBasket(item)}>
          <MinusCircleIcon
            size={30}
            color={item.quantity > 0 ? "#00CCBB" : "gray"}
          />
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity onPress={() => addItemToBasket(item)}>
          <PlusCircleIcon size={30} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: urlFor(item.image).url() }}
        className="h-12 w-12 rounded-full"
      />
      <Text className="flex-1">{item.name}</Text>
      <Text className="text-gray-600">
        <Currency quantity={item.price} currency="AUD" />
      </Text>

      <TouchableOpacity onPress={() => removeItemFromBasket(item)} className="">
        <Text className="text-[#00CCBB] text-xs">Remove</Text>
      </TouchableOpacity>
    </View>
  );
};
