import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StyleSheet, Text, View } from "react-native";

export default function AnalyticsScreen() {
  const stats = [
    { id: "1", label: "Gastos del mes", value: 400 },
    { id: "2", label: "Ingresos del mes", value: 800 },
    { id: "3", label: "Ahorro total", value: 400 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadísticas</Text>
      <Text style={styles.subtitle}>📊 Visualiza tu dinero en acción</Text>
      {stats.map((stat) => (
        <Card key={stat.id} style={styles.card}>
          <Text style={styles.cardTitle}>{stat.label}</Text>
          <Text style={styles.cardSubtitle}>${stat.value}</Text>
        </Card>
      ))}
      <View style={styles.buttonContainer}>
        <Button onPress={() => {}}>Actualizar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  card: { padding: 16, marginBottom: 12, borderRadius: 12 },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: "#555" },
  buttonContainer: { position: "absolute", bottom: 20, left: 20, right: 20 },
});
