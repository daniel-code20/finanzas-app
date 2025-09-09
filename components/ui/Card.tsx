import React from "react";
import { StyleSheet, View } from "react-native";

interface CardProps {
  color?: string;
  children: React.ReactNode;
}

export function Card({ color = "#000", children }: CardProps) {
  return (
    <View style={[styles.card, { borderColor: color }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f3f3f3c7",
    padding: 16,
    borderRadius: 24,
    marginVertical: 8,
    borderWidth: 0,
    alignItems: "flex-start",
    width: "100%",
  },
});
