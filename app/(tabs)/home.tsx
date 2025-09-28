import React from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const eventosDestaque = [
  { id: "1", titulo: "Show do Coldplay", imagem: "https://picsum.photos/400/200?1" },
  { id: "2", titulo: "Festival de Comida", imagem: "https://picsum.photos/400/200?2" },
];

const eventosProximos = [
  { id: "3", titulo: "Peça de Teatro", local: "Teatro Municipal", data: "30/09/2025" },
  { id: "4", titulo: "Feira de Tecnologia", local: "Centro de Eventos", data: "10/10/2025" },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>EventFind 🎉</Text>
      <Text style={styles.subtitle}>Descubra eventos incríveis perto de você</Text>

      {/* Barra de busca */}
      <TextInput style={styles.search} placeholder="🔍 Buscar eventos..." />

      {/* Eventos em destaque */}
      <Text style={styles.sectionTitle}>🔥 Destaques</Text>
      <FlatList
        data={eventosDestaque}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
        style={{ marginBottom: 20 }}
      />

      {/* Eventos próximos */}
      <Text style={styles.sectionTitle}>📅 Próximos Eventos</Text>
      {eventosProximos.map((evento) => (
        <View key={evento.id} style={styles.listItem}>
          <Text style={styles.listTitle}>{evento.titulo}</Text>
          <Text style={styles.listSubtitle}>
            {evento.local} • {evento.data}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  search: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    width: 200,
    marginRight: 12,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardText: {
    padding: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});