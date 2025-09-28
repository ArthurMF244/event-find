import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      {/* Ícone ou logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🎟️</Text>
        </View>
      </View>

      {/* Título */}
      <Text style={styles.title}>Bem-vindo ao EventFind</Text>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>
        Encontre os melhores eventos perto de você {"\n"} e nunca perca uma diversão!
      </Text>

      {/* Botões de login social */}
      <TouchableOpacity style={styles.buttonGoogle}>
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonFacebook}>
        <Text style={styles.buttonText}>Entrar com Facebook</Text>
      </TouchableOpacity>

      {/* Criar conta */}
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Criar uma conta</Text>
        </TouchableOpacity>
      </Link>

      {/* Termos de serviço */}
      <Text style={styles.footerText}>
        Ao continuar, você concorda com nossos {"\n"} <Text style={styles.link}>Termos de Serviço</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#7b61ff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 32,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  buttonGoogle: {
    backgroundColor: "#7b61ff",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    marginBottom: 12,
  },
  buttonFacebook: {
    backgroundColor: "#7b61ff",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: "#7b61ff",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    marginBottom: 24,
  },
  buttonOutlineText: {
    color: "#7b61ff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  footerText: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
  link: {
    color: "#7b61ff",
    fontWeight: "600",
  },
});
