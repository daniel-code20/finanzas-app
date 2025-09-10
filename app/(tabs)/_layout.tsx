import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
          position: Platform.OS === "ios" ? "absolute" : "relative",
        },
        tabBarActiveTintColor: "black", // color del texto e icono activo
        tabBarInactiveTintColor: "#999", // color del texto e icono inactivo
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <Feather 
              name="home" // Feather no tiene outline, usamos color para indicar activo/inactivo
              size={24} 
              color={focused ? "black" : "#999"} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: "Movimientos",
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name={focused ? "money-bill-1" : "money-bill-1"} // FontAwesome6 solid vs regular si quieres outline real
              size={24}
              color={focused ? "black" : "#999"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="goals"
        options={{
          title: "Metas",
          tabBarIcon: ({ focused }) => (
            <Feather 
              name="flag" 
              size={24} 
              color={focused ? "black" : "#999"} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Estadísticas",
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "analytics" : "analytics-outline"} 
              size={24} 
              color={focused ? "black" : "#999"} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <AntDesign 
              name="user" // AntDesign no tiene outline, usamos color
              size={24} 
              color={focused ? "black" : "#999"} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
