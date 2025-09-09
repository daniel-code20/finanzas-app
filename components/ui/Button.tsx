import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  color?: string;
}

export function Button({ children, onPress, color = "#000000ff" }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      {typeof children === "string" ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 52,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffffff",
    textAlign: "center",
  },
});
