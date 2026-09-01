import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function cadastrar() {
    // Vamos conectar ao backend depois.

    router.replace("/login");
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
          Criar conta
        </Text>

        <Text style={styles.subtitulo}>
          Cadastre-se para fazer seus pedidos
        </Text>
      </View>

      <View style={styles.formulario}>

        <Text style={styles.label}>
          Nome
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

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

        <Text style={styles.label}>
          Confirmar senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha novamente"
          placeholderTextColor="#999"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.botaoPressionado,
          ]}
          onPress={cadastrar}
        >
          <Text style={styles.botaoTexto}>
            Criar conta
          </Text>
        </Pressable>

        <Pressable
          style={styles.login}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.loginTexto}>
            Já tenho uma conta
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
    marginTop: 15,
    marginBottom: 20,
  },

  logo: {
    fontSize: 55,
    marginBottom: 8,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitulo: {
    fontSize: 15,
    color: "#666",
    marginTop: 6,
    textAlign: "center",
  },

  formulario: {
    width: "100%",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },

  botao: {
    backgroundColor: "#000",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
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

  login: {
    alignItems: "center",
    marginTop: 18,
  },

  loginTexto: {
    fontSize: 15,
    textDecorationLine: "underline",
  },
});