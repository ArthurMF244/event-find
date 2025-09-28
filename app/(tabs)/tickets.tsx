import { View, Text, StyleSheet } from "react-native";

export default function TicketsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Ingressos</Text>
      <Text style={styles.empty}>🎟️ Você ainda não possui ingressos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  empty: { fontSize: 16, color: "#666" },
});
