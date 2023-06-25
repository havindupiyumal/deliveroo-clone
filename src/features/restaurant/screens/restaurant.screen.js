import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../../../services/sanity/sanity";

import { StarIcon } from "react-native-heroicons/solid";

import { ChevronRightIcon, ArrowLeftIcon } from "react-native-heroicons/solid";

import {
  QuestionMarkCircleIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";

import { Dish } from "../component/dish.component";
import { BasketIcon } from "../component/basket-icon.component";

import { setRestaurant } from "../../../services/redux/slices/restaurant.slice";

export const RestaurantScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {
    params: {
      _id,
      title,
      imageUrl,
      rating,
      genre,
      address,
      shortDescription,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        _id,
        title,
        imageUrl,
        rating,
        genre,
        address,
        shortDescription,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />

      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imageUrl).url() }}
            className="h-56 w-full bg-gray-300"
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon height={20} width={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="pt-4">
            <Text className="text-3xl font-bold px-2">{title}</Text>
            {/* restaurant info */}
            <View className="flex-row items-center space-x-1 pt-2 px-2">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{rating}</Text> . {genre}
              </Text>

              <MapPinIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-xs text-gray-500 truncate">
                Nearby . {address}
              </Text>
            </View>

            <Text className="text-gray-500 mt-2 pb-4 px-2">
              {shortDescription}
            </Text>

            {/* food allergy */}
            <TouchableOpacity className="flex-row justify-evenly space-x-2 p-4 border-y border-gray-300">
              <QuestionMarkCircleIcon color="gray" size="22" opacity={0.6} />
              <Text className="pl-2 flex-1 text-md font-bold">
                Have a food Allergy?
              </Text>
              <ChevronRightIcon color="#00CCBB" size={22} opacity={0.6} />
            </TouchableOpacity>

            <View className="pb-10">
              <Text className="pt-6 mb-3 font-bold text-xl px-2">Menu</Text>

              {/* dish row */}
              {dishes.map((dish) => {
                return <Dish key={dish._id} dish={dish} />;
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
