import { View, Text, ScrollView } from "react-native";
import React from "react";

import { ArrowRightIcon } from "react-native-heroicons/outline";
import { RestaurantCard } from "../../../../components/restaurant/restaurant-card.component";

export const FeaturedRow = ({ id, title, description, restaurants }) => {
  return (
    <View className="my-3">
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="pt-4"
      >
        {/* Restaurants Card */}
        {restaurants?.map(
          ({
            _id,
            name,
            short_description,
            address,
            rating,
            long,
            lat,
            dishes,
            type,
            image,
          }) => {
            return (
              <RestaurantCard
                key={_id}
                id={_id}
                title={name}
                imageUrl={image}
                rating={rating}
                genre={type?.name}
                address={address}
                shortDescription={short_description}
                dishes={dishes}
                long={long}
                lat={lat}
              />
            );
          }
        )}
      </ScrollView>
    </View>
  );
};
