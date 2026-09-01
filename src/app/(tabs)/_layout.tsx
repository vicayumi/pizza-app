import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cardapio"
        options={{
          title: "Cardápio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="pizza"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="carrinho"
        options={{
          title: "Carrinho",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cart"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}