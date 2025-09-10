import { Button } from "@/components/ui/Button";
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
  onSave: (title: string, amount: string, type: "ingreso" | "gasto", date: Date) => void;
};

export function TransactionModal({ visible, onClose, onSave }: TransactionModalProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");
  const [type, setType] = useState<"ingreso" | "gasto">("gasto");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (visible) {
      setTitle("");
      setAmount("");
      setDisplayAmount("");
      setType("gasto");
      setDate(new Date());
      setShowDatePicker(false);
      setError("");
    }
  }, [visible]);

  useEffect(() => {
    if (!amount) {
      setDisplayAmount("");
      return;
    }
    const sign = type === "ingreso" ? "+" : "-";
    const numericValue = Math.abs(Number(amount)) || 0;
    setDisplayAmount(`${sign}${numericValue}`);
  }, [amount, type]);

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
    d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });

  const colors = {
    ingreso: { border: "#2ecc71", background: "#d1f7d6", text: "#2ecc71" },
    gasto: { border: "#e74c3c", background: "#f9d6d5", text: "#e74c3c" },
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Botón X para cerrar */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Nuevo movimiento</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Monto"
            value={displayAmount}
            onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ""))}
            keyboardType="numeric"
            style={[
              styles.input,
              {
                borderColor: colors[type].border,

                color: colors[type].text,
              },
            ]}
          />

          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "ingreso" && {
                  backgroundColor: colors.ingreso.background,
                  borderColor: colors.ingreso.border,
                },
              ]}
              onPress={() => setType("ingreso")}
            >
              <Text style={{ color: type === "ingreso" ? colors.ingreso.text : "#000" }}>Ingreso</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "gasto" && {
                  backgroundColor: colors.gasto.background,
                  borderColor: colors.gasto.border,
                },
              ]}
              onPress={() => setType("gasto")}
            >
              <Text style={{ color: type === "gasto" ? colors.gasto.text : "#000" }}>Gasto</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
            <Text>Fecha: {formatDate(date)}</Text>
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

          <Button onPress={handleSave}>Guardar</Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000099" },
  modalContent: { width: "90%", backgroundColor: "#fff", borderRadius: 16, padding: 20, paddingTop: 40 },
  closeButton: { position: "absolute", top: 10, right: 18, zIndex: 10 },
  closeButtonText: { fontSize: 20, fontWeight: "700", color: "#888" },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12, textAlign: "center" },
  errorText: { color: "#e74c3c", marginBottom: 10, fontWeight: "600", textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  typeContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 12 },
  typeButton: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
  dateButton: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 12, alignItems: "center" },
});

