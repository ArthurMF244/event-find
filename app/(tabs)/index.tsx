import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Bem-vindo ao EventFind</Text>
      <Text style={styles.subtitle}>Descubra os melhores eventos perto de você!</Text>

      {/* Botão para cadastro */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/welcome")} // chama a tela de cadastro
      >
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>

      {/* Botão para entrar direto no app */}
      <TouchableOpacity
        style={[styles.button, styles.outlineButton]}
        onPress={() => router.push("/(tabs)")} // entra direto nas abas
      >
        <Text style={styles.outlineButtonText}>Entrar sem conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30, textAlign: "center" },
  button: {
    backgroundColor: "#7b61ff",
    paddingVertical: 14,
    borderRadius: 8,
    width: "80%",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600", fontSize: 16 },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#7b61ff",
    backgroundColor: "transparent",
  },
  outlineButtonText: { color: "#7b61ff", textAlign: "center", fontWeight: "600", fontSize: 16 },
});
