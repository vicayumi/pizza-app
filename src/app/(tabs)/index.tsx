import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";

import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.topo}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          A melhor pizza está aqui!
        </Text>
      </View>

      <View style={styles.destaque}>
        <Text style={styles.destaqueEmoji}>
          🍕
        </Text>

        <View style={styles.destaqueInfo}>
          <Text style={styles.destaqueTitulo}>
            Pizza do dia
          </Text>

          <Text style={styles.destaqueTexto}>
            Escolha sua pizza favorita e peça agora!
          </Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.push("/cardapio")}
      >
        <Text style={styles.buttonText}>
          Ver cardápio
        </Text>

        <Text style={styles.arrow}>
          →
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  topo: {
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 15,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 24,
    color: "#8e1a1a",
    textAlign: "center",
    lineHeight: 30,
    fontWeight: "bold",
  },

  destaque: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
  },

  destaqueEmoji: {
    fontSize: 45,
    marginRight: 15,
  },

  destaqueInfo: {
    flex: 1,
  },

  destaqueTitulo: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },

  destaqueTexto: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  button: {
    backgroundColor: "#000",
    borderRadius: 14,
    paddingVertical: 17,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  arrow: {
    color: "#fff",
    fontSize: 22,
    marginLeft: 10,
  },
});