import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.greeting}>¡Hola, Dani! 👋</Text>
      <Text style={styles.phrase}>
        Cada gasto cuenta, cada ahorro brilla ✨
      </Text>

      <Card>
        <Text style={styles.cardTitle}>💸 Gastos</Text>
        <Text style={styles.cardValue}>$120</Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>📈 Ingresos</Text>
        <Text style={styles.cardValue}>$200</Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>💰 Ahorro</Text>
        <Text style={styles.cardValue}>$80</Text>
      </Card>

      <Button onPress={() => {}}>Agregar movimiento</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    padding: 20,
    paddingTop: 60,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: "center",
  },
  greeting: {
    fontSize: 24,
    textAlign: "left",
    marginBottom: 4,
    fontWeight: "700",
  },
  phrase: {
    fontSize: 16,
    color: "#555",
    textAlign: "left",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "700",
  },
});
