import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import { useCart } from "../../context/CartContext";
import { pizzas } from "../../data/pizzas";

export default function PizzaDetalhesScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { adicionarAoCarrinho } = useCart();

    const [quantidade, setQuantidade] = useState(1);

    const pizza = pizzas.find(
        (item) => item.id === id
    );

    if (!pizza) {
        return (
        <View style={styles.erro}>
            <Text style={styles.erroTexto}>
            Pizza não encontrada.
            </Text>
        </View>
        );
    }

    const total = pizza.preco * quantidade;

        function adicionar() {
            if (!pizza) {
                return;
            }

            adicionarAoCarrinho(pizza, quantidade);
            router.push("/carrinho");
        }

        return (
            <View style={styles.container}>
            <Pressable
                style={styles.voltar}
                onPress={() => router.back()}
            >
                <Text style={styles.voltarTexto}>← Voltar</Text>
            </Pressable>

            <Image
                source={pizza.imagem}
                style={styles.imagem}
                resizeMode="cover"
            />

            <View style={styles.conteudo}>
                <Text style={styles.nome}>
                {pizza.nome}
                </Text>

                <Text style={styles.descricao}>
                {pizza.descricao}
                </Text>

                <Text style={styles.preco}>
                R$ {pizza.preco.toFixed(2).replace(".", ",")}
                </Text>

                <Text style={styles.tituloQuantidade}>
                Quantidade
                </Text>

                <View style={styles.controles}>
                <Pressable
                    style={styles.botaoQuantidade}
                    onPress={() =>
                    setQuantidade(
                        Math.max(1, quantidade - 1)
                    )
                    }
                >
                    <Text style={styles.simbolo}>−</Text>
                </Pressable>

                <Text style={styles.quantidade}>
                    {quantidade}
                </Text>

                <Pressable
                    style={styles.botaoQuantidade}
                    onPress={() =>
                    setQuantidade(quantidade + 1)
                    }
                >
                    <Text style={styles.simbolo}>+</Text>
                </Pressable>
                </View>

                <View style={styles.resumo}>
                <Text style={styles.resumoTexto}>
                    Total
                </Text>

                <Text style={styles.total}>
                    R$ {total.toFixed(2).replace(".", ",")}
                </Text>
                </View>

                <Pressable
                style={({ pressed }) => [
                    styles.botaoAdicionar,
                    pressed && styles.botaoPressionado,
                ]}
                onPress={adicionar}
                >
                <Text style={styles.botaoAdicionarTexto}>
                    Adicionar ao carrinho
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
  },

  voltar: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    elevation: 4,
  },

  voltarTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },

  imagem: {
    width: "100%",
    height: 300,
  },

  conteudo: {
    padding: 20,
  },

  nome: {
    fontSize: 30,
    fontWeight: "bold",
  },

  descricao: {
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
  },

  preco: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  tituloQuantidade: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
  },

  controles: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  botaoQuantidade: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  simbolo: {
    color: "#fff",
    fontSize: 25,
  },

  quantidade: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },

  resumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  resumoTexto: {
    fontSize: 20,
    fontWeight: "bold",
  },

  total: {
    fontSize: 24,
    fontWeight: "bold",
  },

  botaoAdicionar: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingVertical: 17,
    borderRadius: 12,
    alignItems: "center",
  },

  botaoPressionado: {
    transform: [{ scale: 0.96 }],
    opacity: 0.7,
  },

  botaoAdicionarTexto: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  erro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  erroTexto: {
    fontSize: 18,
  },
});