import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";

const BASE_URL = "http://10.0.2.2:3000";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return;
    }

    try {
      setCarregando(true);
      setMensagem("");

      const resposta = await fetch(`${BASE_URL}/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(dados.mensagem || "Erro ao criar conta.");
        return;
      }

      setMensagem("Conta criada com sucesso!");

      // Vai para o login depois de cadastrar
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);

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
          onPress={cadastrar}
          disabled={carregando}
        >
          <Text style={styles.botaoTexto}>
            {carregando
              ? "Criando conta..."
              : "Criar conta"}
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

  mensagem: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 14,
    color: "#d00",
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