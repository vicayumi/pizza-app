import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    // Vamos conectar ao sistema de login depois.

    router.replace("/perfil");
  }

  return (
    <View style={styles.container}>

      <Pressable
        style={styles.voltar}
        onPress={() => router.back()}
      >
        <Text style={styles.voltarTexto}>
          ← Voltar
        </Text>
      </Pressable>

      <View style={styles.cabecalho}>
        <Text style={styles.logo}>🍕</Text>

        <Text style={styles.titulo}>
          Bem-vindo!
        </Text>

        <Text style={styles.subtitulo}>
          Entre na sua conta para continuar
        </Text>
      </View>

      <View style={styles.formulario}>

        <Text style={styles.label}>
          E-mail
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          Senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.botaoPressionado,
          ]}
          onPress={entrar}
        >
          <Text style={styles.botaoTexto}>
            Entrar
          </Text>
        </Pressable>

        <Pressable
          style={styles.cadastro}
          onPress={() => router.push("/cadastro")}
        >
          <Text style={styles.cadastroTexto}>
            Ainda não tenho uma conta
          </Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 55,
  },

  voltar: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  voltarTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },

  cabecalho: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 35,
  },

  logo: {
    fontSize: 65,
    marginBottom: 12,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitulo: {
    fontSize: 15,
    color: "#666",
    marginTop: 7,
    textAlign: "center",
  },

  formulario: {
    width: "100%",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },

  botao: {
    backgroundColor: "#000",
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  botaoPressionado: {
    transform: [{ scale: 0.97 }],
    opacity: 0.7,
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  cadastro: {
    alignItems: "center",
    marginTop: 22,
  },

  cadastroTexto: {
    fontSize: 15,
    textDecorationLine: "underline",
  },
});