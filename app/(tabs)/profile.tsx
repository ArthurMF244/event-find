import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../config/firebaseConfig";

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.replace("../index"); // caso o usuário não esteja logado
          return;
        }

        const ref = doc(db, "usuarios", user.uid);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setUserData(snapshot.data());
        } else {
          console.warn("Usuário não encontrado no Firestore!");
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarPerfil();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/"); // volta pra tela inicial ou login
    } catch (error) {
      Alert.alert("Erro ao sair", "Não foi possível desconectar.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00853E" />
        <Text style={{ marginTop: 10 }}>Carregando perfil...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Não foi possível carregar os dados 😕</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{userData.nome}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
      </View>

      {/* Informações detalhadas */}
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={20} color="#00853E" />
          <Text style={styles.infoText}>Nome: {userData.nome}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color="#00853E" />
          <Text style={styles.infoText}>E-mail: {userData.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#00853E" />
          <Text style={styles.infoText}>Nascimento: {userData.nascimento}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time" size={20} color="#00853E" />
          <Text style={styles.infoText}>Idade: {userData.idade} anos</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#00853E" />
          <Text style={styles.infoText}>
            Conta criada em:{" "}
            {new Date(userData.criadoEm.seconds * 1000).toLocaleDateString("pt-BR")}
          </Text>
        </View>
      </View>

      {/* Botão de sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  email: {
    fontSize: 15,
    color: "#666",
  },
  infoBox: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00853E",
    borderRadius: 10,
    paddingVertical: 14,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  errorText: {
    textAlign: "center",
    color: "#444",
    marginTop: 30,
  },
});