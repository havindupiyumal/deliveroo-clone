import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";

import {
  selectBasketTotalQuantity,
  selectBasketTotal,
} from "../../../services/redux/slices/basket.selector";
import { useNavigation } from "@react-navigation/native";

export const BasketIcon = () => {
  const basketTotalQuantity = useSelector(selectBasketTotalQuantity);
  const basketTotal = useSelector(selectBasketTotal);

  const navigation = useNavigation();

  // do not show the basket item if the ther are no items in the basket
  if (basketTotalQuantity === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="flex-row bg-[#00CCBB] mx-5 p-4 rounded-lg items-center space-x-2"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {basketTotalQuantity}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={basketTotal} currency="AUD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
