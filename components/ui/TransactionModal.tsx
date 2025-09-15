import { Button } from "@/components/ui/Button";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type TransactionModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    amount: string,
    type: "ingreso" | "gasto",
    date: Date
  ) => void;
};

export function TransactionModal({
  visible,
  onClose,
  onSave,
}: TransactionModalProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"ingreso" | "gasto">("gasto");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");

  const colors = {
    ingreso: { border: "#2ecc71", background: "#d1f7d6", text: "#2ecc71" },
    gasto: { border: "#e74c3c", background: "#f9d6d5", text: "#e74c3c" },
  };

  useEffect(() => {
    if (visible) {
      setTitle("");
      setAmount("");
      setType("gasto");
      setDate(new Date());
      setShowDatePicker(false);
      setError("");
    }
  }, [visible]);

  const handleSave = () => {
    if (!title.trim() && !amount.trim()) {
      setError("🚨 Título y monto son obligatorios!");
      return;
    }
    if (!title.trim()) {
      setError("⚠️ No olvides poner un título!");
      return;
    }
    if (!amount.trim()) {
      setError("💰 El monto no puede estar vacío!");
      return;
    }
    if (isNaN(Number(amount))) {
      setError("❌ El monto debe ser un número válido!");
      return;
    }
    setError("");
    onSave(title, amount, type, date);
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Nuevo movimiento</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Input Título */}
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          {/* Input Monto */}
          <TextInput
            placeholder="Monto"
            value={amount}
            onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
            keyboardType="numeric"
            style={styles.input}
          />

          {/* Dropdown Tipo */}
          <View style={styles.dropdownWrapper}>
            <CustomDropdown<"ingreso" | "gasto">
              options={[
                { label: "Ingreso", value: "ingreso" },
                { label: "Gasto", value: "gasto" },
              ]}
              selectedValue={type}
              onValueChange={(value) => setType(value)}
              inputStyle={{
                backgroundColor:
                  type === "ingreso"
                    ? colors.ingreso.background
                    : colors.gasto.background,
                borderColor:
                  type === "ingreso"
                    ? colors.ingreso.border
                    : colors.gasto.border,
              }}
              textStyle={{
                color:
                  type === "ingreso" ? colors.ingreso.text : colors.gasto.text,
                fontWeight: "600",
              }}
              optionStyle={{
                backgroundColor: "#fff",
                borderColor: "#ccc",
              }}
              optionTextStyle={{
                fontWeight: "500", // solo propiedades que no sean color
              }}
            />
          </View>

          {/* Selector de Fecha */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>Fecha: {formatDate(date)}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* Botón Guardar */}
          <Button onPress={handleSave}>Guardar</Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    paddingTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 18,
    zIndex: 10,
  },
  closeButtonText: { fontSize: 20, fontWeight: "700", color: "#888" },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 8,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  dropdownWrapper: {
    marginBottom: 12,
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    marginTop: 8,
  },
});
