import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TransactionModal } from "@/components/ui/TransactionModal";
import { useTransactions } from "@/context/TransactionsContext";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function TransactionsScreen() {
  const { transactions, addTransaction } = useTransactions();
  const [modalVisible, setModalVisible] = useState(false);

  const formatDate = (d: string | Date) => {
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus movimientos</Text>
      <Text style={styles.subtitle}>Maneja tu dinero con flow ✨</Text>

      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>
            🎉 ¡Todavía no hay movimientos! Agrega algo 💸
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card bgColor={item.bgColor} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text
                  style={[
                    styles.cardAmount,
                    item.type === "ingreso" ? styles.income : styles.expense,
                  ]}
                >
                  {item.amount > 0 ? `+${item.amount}` : item.amount}$
                </Text>
              </View>
              <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
            </Card>
          )}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button onPress={() => setModalVisible(true)}>
          Agregar movimiento
        </Button>
      </View>

      <TransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(title, amount, type, date) => {
          addTransaction(title, amount, type, date);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    marginRight: 4,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "left",
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyMessage: { fontSize: 16, color: "#999", textAlign: "center" },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    position: "relative",
    borderRadius: 12,
  },
  cardContent: { flexDirection: "column" },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  cardAmount: { fontSize: 14, fontWeight: "500", marginTop: 4 },
  cardDate: {
    position: "absolute",
    top: 8,
    right: 12,
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  income: { color: "#2ecc71" },
  expense: { color: "#e74c3c" },
  buttonContainer: { position: "absolute", bottom: 20, left: 20, right: 20 },
});
