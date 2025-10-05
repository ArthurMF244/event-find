import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function EventoDetalhes() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [evento, setEvento] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarEvento = async () => {
      try {
        const ref = doc(db, "eventos", String(id));
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setEvento(snapshot.data());
        } else {
          console.warn("Evento não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarEvento();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00853E" />
        <Text style={{ marginTop: 10 }}>Carregando evento...</Text>
      </View>
    );
  }

  if (!evento) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Evento não encontrado 😕</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Imagem de capa */}
      <Image
        source={{ uri: evento.imagem }}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Botão voltar */}
      <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={40} color="#fff" />
      </TouchableOpacity>

      {/* Informações principais */}
      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>{evento.titulo}</Text>
        <Text style={styles.categoria}>{evento.categoria}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#00853E" />
          <Text style={styles.infoText}>{evento.data}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#00853E" />
          <Text style={styles.infoText}>{evento.endereco}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="cash" size={20} color="#00853E" />
          <Text style={styles.infoText}>
            {evento.preco > 0 ? `R$ ${evento.preco.toFixed(2)}` : "Entrada gratuita"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="people" size={20} color="#00853E" />
          <Text style={styles.infoText}>Vagas disponíveis: {evento.vagasDisponiveis}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.infoText}>Avaliações: {evento.avaliacoes}/5</Text>
        </View>

        {/* Descrição */}
        <Text style={styles.descricaoTitulo}>Descrição</Text>
        <Text style={styles.descricao}>{evento.descricao}</Text>

        {/* Botão ação */}
        <TouchableOpacity style={styles.button}>
          <Ionicons name="ticket" size={20} color="#fff" />
          <Text style={styles.buttonText}>Participar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  infoContainer: {
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  categoria: {
    fontSize: 16,
    color: "#00853E",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#444",
    flexShrink: 1,
  },
  descricaoTitulo: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  descricao: {
    fontSize: 15,
    color: "#555",
    marginTop: 6,
    lineHeight: 22,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#00853E",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#00853E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontWeight: "600",
  },
});