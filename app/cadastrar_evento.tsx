import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import { db } from "../config/firebaseConfig";

export default function CadastrarEvento() {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [avaliacoes, setAvaliacoes] = useState("");
  const [vagas, setVagas] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");

  const handleSalvar = async () => {
    if (!titulo || !data || !endereco || !descricao || !preco || !categoria || !imagem) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      await addDoc(collection(db, "eventos"), {
        titulo,
        data,
        endereco,
        descricao,
        preco: parseFloat(preco),
        avaliacoes: avaliacoes ? parseFloat(avaliacoes) : 0,
        vagasDisponiveis: vagas ? parseInt(vagas) : 0,
        categoria,
        imagem,
        criadoEm: new Date(),
      });

      Alert.alert("Sucesso", "Evento cadastrado com sucesso!");
      // limpa os campos
      setTitulo("");
      setData("");
      setEndereco("");
      setDescricao("");
      setPreco("");
      setAvaliacoes("");
      setVagas("");
      setCategoria("");
      setImagem("");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.title}>Cadastro de Evento</Text>

      <TextInput
        style={styles.input}
        placeholder="Título do evento"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Data (ex: 2025-12-10)"
        value={data}
        onChangeText={setData}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço completo"
        value={endereco}
        onChangeText={setEndereco}
      />

      <TextInput
        style={styles.input}
        placeholder="URL da imagem (ex: https://...)"
        value={imagem}
        onChangeText={setImagem}
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Preço (R$)"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Avaliações (ex: 4.5)"
        value={avaliacoes}
        onChangeText={setAvaliacoes}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Vagas disponíveis"
        value={vagas}
        onChangeText={setVagas}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Categoria (ex: Música, Teatro, Esporte)"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Evento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#00853E",
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
