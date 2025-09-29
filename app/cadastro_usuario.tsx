import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

// Firebase
import { auth, db } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function CadastroUsuario() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const calcularIdade = (data: string) => {
    const partes = data.split("/");
    if (partes.length !== 3) return 0;

    const [dia, mes, ano] = partes.map((n) => parseInt(n));
    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const handleCadastro = async () => {
    if (!nome || !nascimento || !email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const idade = calcularIdade(nascimento);
    if (idade < 16) {
      Alert.alert("Erro", "Você deve ter pelo menos 16 anos para se cadastrar.");
      return;
    }

    try {
      // 1. Cria o usuário no Auth (email/senha)
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 2. Salva dados adicionais no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        nascimento,
        idade,
        email,
        criadoEm: new Date(),
      });

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.replace("/"); // Redireciona para a Home/Login
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <MaskedTextInput
        mask="99/99/9999"
        placeholder="Data de Nascimento (dd/mm/aaaa)"
        value={nascimento}
        onChangeText={(text) => setNascimento(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});