import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const eventosDestaque = [
  { id: "1", titulo: "Show do Coldplay", imagem: "https://picsum.photos/400/200?1" },
  { id: "2", titulo: "Festival de Comida de Rua", imagem: "https://picsum.photos/400/200?2" },
  { id: "3", titulo: "Sunset Eletrônico", imagem: "https://picsum.photos/400/200?3" },
  { id: "4", titulo: "Exposição de Arte Moderna", imagem: "https://picsum.photos/400/200?4" },
  { id: "5", titulo: "Feira Geek & Cosplay", imagem: "https://picsum.photos/400/200?5" },
];

const eventosProximos = [
  { id: "6", titulo: "Peça: O Auto da Compadecida", local: "Teatro Municipal", data: "30/09/2025" },
  { id: "7", titulo: "Feira de Tecnologia", local: "Centro de Eventos", data: "10/10/2025" },
  { id: "8", titulo: "Corrida Unimed 10K", local: "Parque Central", data: "12/10/2025" },
  { id: "9", titulo: "Festival de Jazz", local: "Praça XV", data: "15/10/2025" },
  { id: "10", titulo: "Workshop de Startups", local: "Auditório Unoesc", data: "18/10/2025" },
  { id: "11", titulo: "Mostra de Cinema Nacional", local: "Cine Arte", data: "20/10/2025" },
  { id: "12", titulo: "Conferência de Saúde e Tecnologia", local: "Centro de Convenções", data: "25/10/2025" },
  { id: "13", titulo: "Festa das Nações", local: "Parque de Exposições", data: "27/10/2025" },
  { id: "14", titulo: "Show da Ivete Sangalo", local: "Arena Multiuso", data: "31/10/2025" },
  { id: "15", titulo: "Feira do Livro", local: "Praça Central", data: "02/11/2025" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

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

      {/* Barra de busca com botão de filtro */}
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
              <TouchableOpacity style={styles.categoryItem}>
                <Ionicons name="musical-notes" size={20} color="#00853E" />
                <Text style={styles.categoryText}>Música</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem}>
                <Ionicons name="fast-food" size={20} color="#E67E22" />
                <Text style={styles.categoryText}>Gastronomia</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem}>
                <Ionicons name="brush" size={20} color="#9B59B6" />
                <Text style={styles.categoryText}>Arte</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem}>
                <Ionicons name="fitness" size={20} color="#E74C3C" />
                <Text style={styles.categoryText}>Esportes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem}>
                <Ionicons name="game-controller" size={20} color="#3498DB" />
                <Text style={styles.categoryText}>Geek</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Eventos em destaque */}
      <Text style={styles.sectionTitle}>🔥 Destaques</Text>
      <FlatList
        data={eventosDestaque}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: "/evento/[id]", params: { id: item.id } })}
          >
            <Image source={{ uri: item.imagem }} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
      />

      {/* Eventos próximos */}
      <Text style={[styles.sectionTitle, { marginTop: 10 }]}>📅 Próximos Eventos</Text>
      {eventosProximos.map((evento) => (
        <TouchableOpacity
          key={evento.id}
          style={styles.listItem}
          onPress={() => router.push({ pathname: "/evento/[id]", params: { id: evento.id } })}
        >
          <Text style={styles.listTitle}>{evento.titulo}</Text>
          <Text style={styles.listSubtitle}>
            {evento.local} • {evento.data}
          </Text>
        </TouchableOpacity>
      ))}
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
  addButton: {
    marginLeft: 10,
  },
  searchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  searchInput: { flex: 1, height: 45, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 12 },
  filterButton: { backgroundColor: "#00853E", marginLeft: 10, padding: 10, borderRadius: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  card: { width: 200, marginRight: 12, borderRadius: 10, overflow: "hidden", backgroundColor: "#f5f5f5" },
  cardImage: { width: "100%", height: 120 },
  cardText: { padding: 8, fontSize: 14, fontWeight: "600" },
  listItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  listTitle: { fontSize: 16, fontWeight: "bold" },
  listSubtitle: { fontSize: 14, color: "#666" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "80%", backgroundColor: "#fff", borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  categoryContainer: { gap: 10 },
  categoryItem: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#f2f2f2", padding: 10, borderRadius: 8 },
  categoryText: { fontSize: 15 },
  closeButton: { backgroundColor: "#00853E", borderRadius: 8, padding: 10, marginTop: 20 },
  closeText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});