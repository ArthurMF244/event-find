import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLocationPermission = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permissão de localização é necessária para continuar.");
      setLoading(false);
      return;
    }

    // Se permitido, redireciona para a Home
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Texto explicativo */}
      <Text style={styles.title}>Bem-vindo ao GoEvent 🎉</Text>
      <Text style={styles.subtitle}>
        Ative sua localização para encontrar eventos perto de você.
      </Text>

      {/* Botão */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLocationPermission}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Ativando..." : "Permitir Localização"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});