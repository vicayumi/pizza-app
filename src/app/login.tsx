import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";

const BASE_URL = "http://10.0.2.2:3000";

export default function LoginScreen() {
  const { entrar: salvarUsuario } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    // Verifica se os campos foram preenchidos
    if (!email || !senha) {
      setMensagem("Preencha o email e a senha.");
      return;
    }

    try {
      setCarregando(true);
      setMensagem("");

      const resposta = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(
          dados.mensagem || "Email ou senha incorretos."
        );
        return;
      }

      setMensagem("Login realizado com sucesso!");

      salvarUsuario(dados.usuario);

      setTimeout(() => {
        router.replace("/perfil");
      }, 500);
    } catch (erro) {
      console.error("Erro ao fazer login:", erro);

      setMensagem(
        "Não foi possível conectar ao servidor."
      );
    } finally {
      setCarregando(false);
    }
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

        {mensagem !== "" && (
          <Text style={styles.mensagem}>
            {mensagem}
          </Text>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.botaoPressionado,
          ]}
          onPress={entrar}
          disabled={carregando}
        >
          <Text style={styles.botaoTexto}>
            {carregando
              ? "Entrando..."
              : "Entrar"}
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

  mensagem: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 14,
    color: "rgb(0, 0, 0)",
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