import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const user = {
    name: "Dani Tejada",
    email: "dani@example.com",
    role: "Usuario",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>👤 Administra tu información personal</Text>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Nombre</Text>
        <Text style={styles.cardSubtitle}>{user.name}</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Email</Text>
        <Text style={styles.cardSubtitle}>{user.email}</Text>
      </Card>

      <View style={styles.buttonContainer}>
        <Button onPress={() => {}}>Editar Perfil</Button>
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
