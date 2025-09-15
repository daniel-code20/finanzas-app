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
  selectedValue: T;
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
  placeholder = "Selecciona...",
}: CustomDropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => o.value === selectedValue);
  const selectedLabel = selectedOption?.label;

  const handleSelect = (value: T) => {
    onValueChange(value);
    setOpen(false);
  };

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
      : "#000";

  return (
    <View style={[styles.container, style]}>
      {/* INPUT */}
      <TouchableOpacity
        style={[styles.dropdown, { backgroundColor: inputBg }, inputStyle]}
        onPress={() => setOpen(!open)}
      >
        <Text style={[styles.text, { color: inputTextColor }, textStyle]}>
          {selectedLabel || placeholder}
        </Text>
        <Text style={[styles.text, { color: inputTextColor }, textStyle]}>
          {open ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {/* OPCIONES */}
      {open && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item, index }) => {
              // Aquí usamos item.value, no selectedValue ni type
              const optionTextColor =
                item.value === "ingreso"
                  ? "#2ecc71" // verde
                  : item.value === "gasto"
                  ? "#e74c3c" // rojo
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
                  <Text
                    style={[
                      styles.text,
                      { color: optionTextColor },
                      optionTextStyle,
                    ]}
                  >
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  text: { fontSize: 16 },
  optionsContainer: {
    marginTop: 4,
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  option: {
    padding: 12,
  },
});
