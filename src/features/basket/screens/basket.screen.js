import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Currency from "react-currency-formatter";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../../../services/sanity/sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

import {
  selectBasketItems,
  selectBasketTotalQuantity,
  selectBasketTotal,
} from "../../../services/redux/slices/basket.selector";

import { selectRestaurantFromStore } from "../../../services/redux/slices/restaurant.selector";

import {
  addItem,
  reduceItem,
  removeItem,
} from "../../../services/redux/slices/basket.slice";
import { BasketItem } from "../components/basket-item.component";

export const BasketScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const basketItems = useSelector(selectBasketItems);
  const basketTotalQuantity = useSelector(selectBasketTotalQuantity);
  const basketTotal = useSelector(selectBasketTotal);

  const restaurant = useSelector(selectRestaurantFromStore);

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
    <SafeAreaView className="felx-1 bg-white">
      <View className="bg-gray-100">
        {/* Header */}
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        {/* delivery */}
        <View className="flex-row items-center space-x-4 p-3 bg-white my-5">
          <Image
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            source={{
              uri: "https://links.papareact.com/wru",
            }}
          />
          <Text className="flex-1 font-bold text-gray-600">
            Delivery in 50-70 min
          </Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        {/* basket items     */}
        <ScrollView className="divide-y divide-gray-200">
          {basketItems.map((item) => {
            return <BasketItem key={item._id} item={item} />;
          })}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="AUD" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99} currency="AUD" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 5.99} currency="AUD" />
            </Text>
          </View>

          {/* place order button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("PrepareOrderScreen")}
            className="rounded-lg bg-[#00CCBB] p-4 "
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
