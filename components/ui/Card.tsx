import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  bgColor?: string; // fondo de la card
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[]; // para personalizar estilos
}

export function Card({ bgColor = "#f3f3f3c7", children, style }: CardProps) {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 24,
    marginVertical: 8,
    alignItems: "flex-start",
    width: "100%",
  },
});
