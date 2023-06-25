import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../../features/home/screens/home.screen";
import { RestaurantScreen } from "../../features/restaurant/screens/restaurant.screen";
import { BasketScreen } from "../../features/basket/screens/basket.screen";
import { PrepareOrderScreen } from "../../features/order/screens/prepare-order.screen";
import { DeliveryScreen } from "../../features/delivery/screens/delivery.screen";

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrepareOrderScreen"
        component={PrepareOrderScreen}
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeliveryScreen"
        component={DeliveryScreen}
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
