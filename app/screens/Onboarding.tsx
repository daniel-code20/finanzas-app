import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "1",
    title: "¡Bienvenido a FinanzasApp!",
    text: "Lleva el control de tus gastos y ahorros de manera divertida.",
    image: require("../../assets/images/ilustracion.png"),
  },
  {
    key: "2",
    title: "Registra tus gastos",
    text: "Agrega cualquier gasto diario y mantenlo todo en orden.",
    image: require("../../assets/images/ilustracion.png"),
  },
  {
    key: "3",
    title: "Observa tu progreso",
    text: "Visualiza tus ingresos, gastos y ahorros en un solo lugar.",
    image: require("../../assets/images/ilustracion.png"),
  },
];

export default function Onboarding() {
  const [page, setPage] = useState(0);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {slides.map((slide) => (
          <View key={slide.key} style={styles.slide}>
            <Image
              source={
                typeof slide.image === "string"
                  ? { uri: slide.image }
                  : slide.image
              }
              style={styles.image}
            />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.text}>{slide.text}</Text>
          </View>
        ))}
      </PagerView>

      {page === slides.length - 1 && (
        <View style={styles.buttonContainer}>
          <Button onPress={() => router.replace("/(tabs)/home")}>
            ¡Empecemos!
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  pager: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "700",
  },
  text: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  buttonContainer: {
    padding: 20,
    marginBottom: 32,
  },
});
