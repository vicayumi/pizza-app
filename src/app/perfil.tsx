import { StyleSheet, Text, View } from "react-native";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>👤</Text>

      <Text style={styles.title}>Meu Perfil</Text>

      <Text style={styles.subtitle}>
        Faça login para acessar sua conta.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  emoji: {
    fontSize: 70,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 17,
    marginTop: 10,
    textAlign: "center",
  },
});