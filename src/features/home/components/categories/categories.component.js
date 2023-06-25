import React, { useState, useEffect } from "react";

import { View, Text, ScrollView } from "react-native";
import { CategoryCard } from "../../../../components/category/category-card.component";

import { sanityClient } from "../../../../services/sanity/sanity";
import { getCategories } from "../../../../services/sanity/sanity-queries";

export const Categories = () => {
  const [menuCategories, setMenuCategories] = useState(null);

  useEffect(() => {
    sanityClient.fetch(getCategories).then((data) => {
      setMenuCategories(data);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      className="bg-gray-100"
    >
      {/* Category Card */}
      {menuCategories?.map(({ _id, image, name }) => {
        return <CategoryCard key={_id} title={name} imageUrl={image} />;
      })}
    </ScrollView>
  );
};
