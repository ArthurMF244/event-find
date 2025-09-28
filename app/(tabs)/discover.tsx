import { View, Text, StyleSheet, TextInput } from "react-native";

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descobrir Eventos</Text>
      <TextInput
        style={styles.search}
        placeholder="Buscar por categoria, local ou data..."
      />
      <Text style={styles.info}>🔎 Use a busca para encontrar novos eventos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  info: { fontSize: 16, color: "#666" },
});
