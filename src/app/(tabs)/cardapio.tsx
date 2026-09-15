import { useEffect, useState } from "react";

import { router } from "expo-router";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Pizza = {
  id: number;
  nome: string;
  descricao: string;
  preco: number | string;
  imagem: string;
};

const BASE_URL = "http://10.0.2.2:3000";

export default function CardapioScreen() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarPizzas();
  }, []);

  async function buscarPizzas() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(`${BASE_URL}/pizzas`);

      if (!resposta.ok) {
        throw new Error("Erro ao buscar pizzas.");
      }

      const dados = await resposta.json();

      setPizzas(dados);
    } catch (erro) {
      console.error("Erro ao buscar pizzas:", erro);

      setErro("Não foi possível carregar o cardápio.");
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" />
        <Text style={styles.mensagem}>
          Carregando cardápio...
        </Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centralizado}>
        <Text style={styles.erro}>{erro}</Text>

        <Pressable
          style={styles.botaoTentar}
          onPress={buscarPizzas}
        >
          <Text style={styles.botaoTentarTexto}>
            Tentar novamente
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Nosso Cardápio 🍕
      </Text>

      <Text style={styles.subtitle}>
        Escolha sua pizza favorita
      </Text>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/pizza/[id]",
                params: {
                  id: item.id.toString(),
                },
              })
            }
          >
            <Image
              source={{
                uri: `${BASE_URL}/images/${item.imagem}`,
              }}
              style={styles.imagem}
            />

            <View style={styles.informacoes}>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text style={styles.descricao}>
                {item.descricao}
              </Text>

              <Text style={styles.preco}>
                R${" "}
                {Number(item.preco)
                  .toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
          </Pressable>
        )}
      />
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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },

  lista: {
    paddingBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },

  imagem: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },

  informacoes: {
    flex: 1,
    marginLeft: 15,
  },

  nome: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },

  descricao: {
    fontSize: 14,
    color: "#666",
    lineHeight: 19,
    marginBottom: 8,
  },

  preco: {
    fontSize: 17,
    fontWeight: "bold",
  },

  centralizado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  mensagem: {
    marginTop: 10,
    fontSize: 16,
  },

  erro: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },

  botaoTentar: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  botaoTentarTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});