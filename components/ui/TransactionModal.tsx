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
  const [type, setType] = useState<"ingreso" | "gasto" | undefined>(undefined);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // errores individuales
  const [errors, setErrors] = useState<{ title?: string; amount?: string; type?: string }>({});

  const colors = {
    ingreso: { border: "#2ecc71", background: "#d1f7d6", text: "#2ecc71" },
    gasto: { border: "#e74c3c", background: "#f9d6d5", text: "#e74c3c" },
  };

  useEffect(() => {
    if (visible) {
      setTitle("");
      setAmount("");
      setType(undefined); // <-- placeholder activo
      setDate(new Date());
      setShowDatePicker(false);
      setErrors({});
    }
  }, [visible]);

  const handleSave = () => {
    let newErrors: { title?: string; amount?: string; type?: string } = {};

    if (!title.trim()) newErrors.title = "⚠️ El título es obligatorio";
    if (!amount.trim()) newErrors.amount = "💰 El monto no puede estar vacío";
    else if (isNaN(Number(amount)))
      newErrors.amount = "❌ El monto debe ser un número válido";

    if (!type) newErrors.type = "⚠️ Selecciona un tipo de movimiento"; // <-- validación tipo

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && type) {
      onSave(title, amount, type, date);
    }
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
          <Text style={styles.modalSubtitle}>
            Ahorra hoy, disfruta mañana 🌱💸
          </Text>

          {/* Input Título */}
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

          {/* Input Monto */}
          <TextInput
            placeholder="Monto"
            value={amount ? (type === "ingreso" ? "+" : type === "gasto" ? "-" : "") + amount : ""}
            onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
            keyboardType="numeric"
            style={[
              styles.input,
              {
                color:
                  type === "ingreso"
                    ? colors.ingreso.text
                    : type === "gasto"
                    ? colors.gasto.text
                    : "#000",
                fontWeight: "400",
              },
            ]}
          />
          {errors.amount && (
            <Text style={styles.errorText}>{errors.amount}</Text>
          )}

          {/* Dropdown Tipo */}
          <View style={styles.dropdownWrapper}>
            <CustomDropdown<"ingreso" | "gasto">
              options={[
                { label: "Ingreso", value: "ingreso" },
                { label: "Gasto", value: "gasto" },
              ]}
              selectedValue={type}
              onValueChange={(value) => setType(value)}
              placeholder="Selecciona una opción"
              inputStyle={{
                backgroundColor:
                  type === "ingreso"
                    ? colors.ingreso.background
                    : type === "gasto"
                    ? colors.gasto.background
                    : "#f7f7f7ff",
              }}
              textStyle={{
                color:
                  type === "ingreso"
                    ? colors.ingreso.text
                    : type === "gasto"
                    ? colors.gasto.text
                    : "#999",
                fontWeight: "400",
              }}
              optionStyle={{
                backgroundColor: "#fff",
                borderColor: "#ccc",
              }}
              optionTextStyle={{
                fontWeight: "400",
              }}
            />
            {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
          </View>

          {/* Selector de Fecha */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>{formatDate(date)}</Text>
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
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 8,
    fontWeight: "500",
    fontSize: 13,
  },
  input: {
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8, // menos espacio para que el error se vea pegado
    fontSize: 16,
    color: "#000",
    backgroundColor: "#f7f7f7ff",
  },
  dropdownWrapper: {
    marginBottom: 12,
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  dateText: {
    fontSize: 16,
    color: "#646464ff",
  },
  saveButton: {
    marginTop: 8,
  },
});
