import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type Transaction = {
  id: string;
  type: "ingreso" | "gasto";
  title: string;
  amount: number;
  date: string;
};

export default function HomeScreen() {
  // Simulación de movimientos
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", type: "ingreso", title: "Pago de la U", amount: 200, date: "2025-09-10" },
    { id: "2", type: "gasto", title: "Gasolina", amount: 25, date: "2025-09-10" },
    { id: "3", type: "gasto", title: "Pizza", amount: 15, date: "2025-09-09" },
  ]);

  const totalIngresos = transactions.filter(t => t.type==="ingreso").reduce((sum, t) => sum + t.amount, 0);
  const totalGastos = transactions.filter(t => t.type==="gasto").reduce((sum, t) => sum + t.amount, 0);
  const ahorro = totalIngresos - totalGastos;
  const ahorroPercent = totalIngresos ? Math.round((ahorro / totalIngresos) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>¡Hola, Dani! 👋</Text>
      <Text style={styles.phrase}>Cada gasto cuenta, cada ahorro brilla ✨</Text>

      <Card style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Saldo actual</Text>
        <Text style={styles.cardValue}>${ahorro}</Text>
        <Text style={styles.cardSubtitle}>{ahorroPercent}% de tus ingresos ahorrados</Text>
      </Card>

      <View style={styles.row}>
        <Card style={[styles.smallCard, { backgroundColor: "#faffce98" }]}>
          <Text style={styles.cardTitle}>💸 Gastos</Text>
          <Text style={styles.cardValue}>${totalGastos}</Text>
        </Card>
        <Card style={[styles.smallCard, { backgroundColor: "#d0ecff94" }]}>
          <Text style={styles.cardTitle}>📈 Ingresos</Text>
          <Text style={styles.cardValue}>${totalIngresos}</Text>
        </Card>
      </View>

      <Text style={styles.subtitle}>Últimos movimientos</Text>
      <FlatList
        data={transactions.slice(0,3)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.transactionCard}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={[styles.transactionAmount, item.type==="ingreso"?styles.income:styles.expense]}>
              {item.type==="ingreso"?`+${item.amount}`:`-${item.amount}` }$
            </Text>
          </Card>
        )}
      />

      <Button onPress={() => {}}>Agregar movimiento</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#fff" },
  greeting: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
  phrase: { fontSize: 16, color: "#555", marginBottom: 20 },
  summaryCard: { padding: 20, marginBottom: 20, borderRadius: 12 },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  cardValue: { fontSize: 20, fontWeight: "700" },
  cardSubtitle: { fontSize: 14, color: "#555" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  smallCard: { flex: 1, padding: 16, marginHorizontal: 4, borderRadius: 12 },
  subtitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  transactionCard: { padding: 12, marginBottom: 8, borderRadius: 10 },
  transactionTitle: { fontSize: 16, fontWeight: "500" },
  transactionAmount: { fontSize: 16, fontWeight: "700" },
  income: { color: "#2ecc71" },
  expense: { color: "#e74c3c" },
});
