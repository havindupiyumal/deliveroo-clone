import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Currency from "react-currency-formatter";

import { urlFor } from "../../../services/sanity/sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

import {
  addItem,
  reduceItem,
} from "../../../services/redux/slices/basket.slice";

import {
  selectBasketItems,
  selectBasketItemQuantity,
  selectBasketTotalQuantity,
  selectBasketTotal,
  selectBasketItem,
} from "../../../services/redux/slices/basket.selector";

export const Dish = ({ dish }) => {
  const {
    _id: id,
    name,
    short_description: shortDescription,
    price,
    image,
  } = dish;

  const dispatch = useDispatch();

  const basketItemQuantity = useSelector(selectBasketItemQuantity({ ...dish }));
  const basketItem = useSelector(selectBasketItem({ ...dish }));

  const [isPressed, setIsPressed] = useState(false);

  const toggleQuntityAdjuster = () => setIsPressed(!isPressed);

  const addItemToBasketHandler = () => {
    dispatch(
      addItem({
        ...dish,
      })
    );
  };

  const reduceItemFromBasketHandler = () => {
    dispatch(
      reduceItem({
        ...basketItem,
      })
    );
  };
  return (
    <>
      <TouchableOpacity
        onPress={toggleQuntityAdjuster}
        className={`g-white border p-2 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="mb-1 text-lg">{name}</Text>
            <Text className="text-gray-500 mt-2">{shortDescription}</Text>
            <Text className="text-gray-500 mt-2 pb-2">
              <Currency quantity={price} currency="AUD" />
            </Text>
          </View>

          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{ uri: urlFor(image).url() }}
              className="w-20 h-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={reduceItemFromBasketHandler}>
              <MinusCircleIcon
                size={40}
                color={basketItemQuantity > 0 ? "#00CCBB" : "gray"}
              />
            </TouchableOpacity>
            <Text>{basketItemQuantity}</Text>
            <TouchableOpacity onPress={addItemToBasketHandler}>
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
