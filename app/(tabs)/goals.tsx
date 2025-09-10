import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StyleSheet, Text, View } from "react-native";

export default function GoalsScreen() {
  const goals = [
    { id: "1", title: "Ahorrar para la laptop", target: 1000, saved: 200 },
    { id: "2", title: "Vacaciones", target: 500, saved: 150 },
    { id: "3", title: "Fondo de emergencia", target: 300, saved: 100 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Metas de Ahorro</Text>
      <Text style={styles.subtitle}>Maneja tu dinero con flow ✨</Text>
      {goals.map((goal) => (
        <Card key={goal.id} style={styles.card}>
          <Text style={styles.cardTitle}>{goal.title}</Text>
          <Text style={styles.cardSubtitle}>
            ${goal.saved} de ${goal.target} ahorrados
          </Text>
        </Card>
      ))}
      <View style={styles.buttonContainer}>
        <Button onPress={() => {}}>Agregar Meta</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#fff" },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
    marginRight: 4,
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
