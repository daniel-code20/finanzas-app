import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type DeleteButtonProps = {
  onConfirm: () => void;
  size?: number;
  bgColor?: string;
  iconColor?: string;
};

export default function DeleteButton({
  onConfirm,
  size = 40,
  bgColor = "#eee",
  iconColor = "#000",
}: DeleteButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const openModal = () => setModalVisible(true);

  const closeModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 150,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleDelete = () => {
    closeModal();
    onConfirm();
  };

  return (
    <>
      {/* Botón de borrar */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bgColor,
          },
        ]}
        onPress={openModal}
        activeOpacity={0.7}
      >
        <Ionicons name="trash-outline" size={size * 0.5} color={iconColor} />
      </TouchableOpacity>

      {/* Modal tipo SweetAlert */}
      <Modal transparent visible={modalVisible} animationType="none">
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            {/* Icono de alerta */}
            <View style={styles.iconContainer}>
              <Ionicons name="warning-outline" size={50} color="#e74c3c" />
            </View>
            {/* Texto */}
            <Text style={styles.modalTitle}>Confirmación</Text>
            <Text style={styles.modalText}>¿Seguro que quieres borrar este item?</Text>

            {/* Botones */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={closeModal}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#e74c3c" }]}
                onPress={handleDelete}
              >
                <Text style={{ color: "#fff" }}>Sí, borrar</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  } as ViewStyle,
  iconContainer: {
    marginBottom: 10,
  } as ViewStyle,
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  } as ViewStyle,
  modalButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 6,
    alignItems: "center",
  } as ViewStyle,
});
