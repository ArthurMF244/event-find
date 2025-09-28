import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [isCadastro, setIsCadastro] = useState(false);

  function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha!");
      return;
    }
    // Aqui você chamaria sua API de login
    Alert.alert("Login", `Logado como: ${email}`);
  }

  function handleCadastro() {
    if (!email || !senha || !nome) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    // Aqui você chamaria sua API de cadastro
    Alert.alert("Cadastro", `Usuário ${nome} cadastrado com sucesso!`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {isCadastro ? "Cadastro de Usuário" : "Login"}
      </Text>

      {isCadastro && (
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          value={nome}
          onChangeText={setNome}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
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

      {isCadastro ? (
        <Button title="Cadastrar" onPress={handleCadastro} />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          title={
            isCadastro ? "Já tenho conta (Login)" : "Não tenho conta (Cadastrar)"
          }
          onPress={() => setIsCadastro(!isCadastro)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
