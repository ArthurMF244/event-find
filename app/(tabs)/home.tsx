import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function HomeScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const q = query(collection(db, "eventos"), orderBy("data", "asc"));
        const snapshot = await getDocs(q);
        const lista: any[] = [];
        snapshot.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
        setEventos(lista);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarEventos();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Cabeçalho com botão de adicionar evento */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>EventFind 🎉</Text>
          <Text style={styles.subtitle}>Descubra eventos incríveis perto de você</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/cadastrar_evento")}
        >
          <Ionicons name="add-circle" size={36} color="#00853E" />
        </TouchableOpacity>
      </View>

      {/* Barra de busca e filtro */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="🔍 Buscar eventos..." />
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Modal de filtros */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar por Categoria</Text>
            <View style={styles.categoryContainer}>
              {["Música", "Gastronomia", "Arte", "Esportes", "Geek"].map((cat) => (
                <TouchableOpacity key={cat} style={styles.categoryItem}>
                  <Ionicons name="pricetag" size={18} color="#00853E" />
                  <Text style={styles.categoryText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lista de eventos */}
      {loading ? (
        <ActivityIndicator size="large" color="#00853E" style={{ marginTop: 40 }} />
      ) : eventos.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40 }}>Nenhum evento cadastrado ainda 😅</Text>
      ) : (
        <>
          <Text style={styles.sectionTitle}>📅 Próximos Eventos</Text>
          {eventos.map((evento) => (
            <TouchableOpacity
              key={evento.id}
              style={styles.eventCard}
              onPress={() =>
                router.push({
                  pathname: "/evento/[id]",
                  params: { id: evento.id },
                })
              }
            >
              <Image
                source={{ uri: evento.imagem }}
                style={styles.eventImage}
                resizeMode="cover"
              />
              <View style={styles.eventInfo}>
                <Text style={styles.listTitle}>{evento.titulo}</Text>
                <Text style={styles.listSubtitle}>
                  {evento.data} • {evento.categoria}
                </Text>
                <Text style={styles.listEndereco}>{evento.endereco}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#222" },
  subtitle: { fontSize: 16, color: "#666" },
  addButton: { marginLeft: 10 },
  searchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  searchInput: { flex: 1, height: 45, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 12 },
  filterButton: { backgroundColor: "#00853E", marginLeft: 10, padding: 10, borderRadius: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  eventCard: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    overflow: "hidden",
    elevation: 1,
  },
  eventImage: { width: 120, height: 100 },
  eventInfo: { flex: 1, padding: 10 },
  listTitle: { fontSize: 16, fontWeight: "bold" },
  listSubtitle: { fontSize: 14, color: "#00853E", marginBottom: 4 },
  listEndereco: { fontSize: 13, color: "#555" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "80%", backgroundColor: "#fff", borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  categoryContainer: { gap: 10 },
  categoryItem: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#f2f2f2", padding: 10, borderRadius: 8 },
  categoryText: { fontSize: 15 },
  closeButton: { backgroundColor: "#00853E", borderRadius: 8, padding: 10, marginTop: 20 },
  closeText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});