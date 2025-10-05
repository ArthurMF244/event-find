import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../config/firebaseConfig";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado:", userCredential.user.email);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.error(error);
      let msg = "Erro ao fazer login.";
      if (error.code === "auth/invalid-email") msg = "E-mail inválido!";
      if (error.code === "auth/user-not-found") msg = "Usuário não encontrado!";
      if (error.code === "auth/wrong-password") msg = "Senha incorreta!";
      alert(msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao EventFind</Text>
      <Text style={styles.subtitle}>
        Encontre os melhores eventos perto de você {"\n"} e nunca perca uma diversão!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/evento/cadastro_usuario")}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", color: "#222", marginBottom: 8, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 32, textAlign: "center" },
  input: { width: "100%", height: 48, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 12, marginBottom: 16 },
  button: { width: "100%", height: 48, backgroundColor: "#4CAF50", justifyContent: "center", alignItems: "center", borderRadius: 8, marginBottom: 16 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  link: { fontSize: 14, color: "#4CAF50", marginTop: 8 },
});