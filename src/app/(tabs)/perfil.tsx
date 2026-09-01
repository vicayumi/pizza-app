import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Meu Perfil
      </Text>

      <View style={styles.perfil}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            👤
          </Text>
        </View>

        <Text style={styles.nome}>
          Visitante
        </Text>

        <Text style={styles.email}>
          Faça login para acessar sua conta
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.botaoLogin,
          pressed && styles.botaoPressionado,
        ]}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.botaoLoginTexto}>
          Entrar ou criar conta
        </Text>
      </Pressable>

      <View style={styles.opcoes}>

        <Pressable style={styles.opcao}>
          <Text style={styles.opcaoEmoji}>📦</Text>

          <View>
            <Text style={styles.opcaoTitulo}>
              Meus pedidos
            </Text>

            <Text style={styles.opcaoTexto}>
              Veja seus pedidos anteriores
            </Text>
          </View>

          <Text style={styles.seta}>›</Text>
        </Pressable>

        <Pressable style={styles.opcao}>
          <Text style={styles.opcaoEmoji}>⚙️</Text>

          <View>
            <Text style={styles.opcaoTitulo}>
              Configurações
            </Text>

            <Text style={styles.opcaoTexto}>
              Preferências do aplicativo
            </Text>
          </View>

          <Text style={styles.seta}>›</Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },

  perfil: {
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  avatarTexto: {
    fontSize: 50,
  },

  nome: {
    fontSize: 22,
    fontWeight: "bold",
  },

  email: {
    fontSize: 15,
    color: "#666",
    marginTop: 6,
    textAlign: "center",
  },

  botaoLogin: {
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 30,
  },

  botaoPressionado: {
    transform: [{ scale: 0.97 }],
    opacity: 0.7,
  },

  botaoLoginTexto: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  opcoes: {
    gap: 12,
  },

  opcao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 14,
    padding: 17,
  },

  opcaoEmoji: {
    fontSize: 28,
    marginRight: 15,
  },

  opcaoTitulo: {
    fontSize: 17,
    fontWeight: "bold",
  },

  opcaoTexto: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  seta: {
    marginLeft: "auto",
    fontSize: 28,
    color: "#777",
  },
});