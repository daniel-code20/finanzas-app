import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// Genérico <T extends string> para tipos estrictos
export type Option<T extends string> = { label: string; value: T };

type CustomDropdownProps<T extends string> = {
  options: Option<T>[];
  selectedValue?: T;
  onValueChange: (value: T) => void;
  style?: ViewStyle; // Contenedor principal
  inputStyle?: ViewStyle; // Solo el input
  optionStyle?: ViewStyle; // Solo cada opción
  textStyle?: TextStyle; // Texto del input
  optionTextStyle?: TextStyle; // Texto de las opciones
  placeholder?: string;
};

export function CustomDropdown<T extends string>({
  options,
  selectedValue,
  onValueChange,
  style,
  inputStyle,
  optionStyle,
  textStyle,
  optionTextStyle,
  placeholder = "Selecciona una opción",
}: CustomDropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => o.value === selectedValue);
  const selectedLabel = selectedOption?.label || placeholder;

  const inputBg =
    selectedOption?.value === "ingreso"
      ? "#d1f7d6"
      : selectedOption?.value === "gasto"
      ? "#f9d6d5"
      : "#fff";

  const inputTextColor =
    selectedOption?.value === "ingreso"
      ? "#2ecc71"
      : selectedOption?.value === "gasto"
      ? "#e74c3c"
      : "#999"; // gris suave para placeholder

  const handleSelect = (value: T) => {
    onValueChange(value);
    setOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      {/* INPUT */}
      <TouchableOpacity
        style={[styles.dropdown, { backgroundColor: inputBg }, inputStyle]}
        onPress={() => setOpen(!open)}
      >
        <Text
          style={[
            styles.text,
            { color: inputTextColor, fontStyle: !selectedOption ? "italic" : "normal" },
            textStyle,
          ]}
        >
          {selectedLabel}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color={inputTextColor}
        />
      </TouchableOpacity>

      {/* OPCIONES */}
      {open && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item, index }) => {
              const optionTextColor =
                item.value === "ingreso"
                  ? "#000000ff"
                  : item.value === "gasto"
                  ? "#000000ff"
                  : "#000";

              return (
                <TouchableOpacity
                  style={[
                    styles.option,
                    optionStyle,
                    {
                      borderBottomWidth: index === options.length - 1 ? 0 : 1,
                      borderBottomColor: "rgba(0,0,0,0.1)",
                    },
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={[styles.text, { color: optionTextColor }, optionTextStyle]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 12,
  },
  text: { fontSize: 16 },
  optionsContainer: {
    marginTop: 6,
    maxHeight: 150,
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f3f3f3ff",
    overflow: "hidden",
    elevation: 6,
  },
  option: {
    padding: 12,
    backgroundColor: "transparent",
  },
});
