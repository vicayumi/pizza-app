import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useCart } from "../../context/CartContext";

export default function CarrinhoScreen() {
  const {
    cartItems,
    aumentarQuantidade,
    diminuirQuantidade,
    removerDoCarrinho,
    total,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.emoji}>🛒</Text>

        <Text style={styles.titulo}>
          Seu carrinho está vazio
        </Text>

        <Text style={styles.subtitulo}>
          Adicione uma pizza deliciosa!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Carrinho 🛒</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
            <View style={styles.card}>
            <Image
                source={item.imagem}
                style={styles.imagem}
                resizeMode="cover"
            />

            <View style={styles.info}>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text style={styles.preco}>
                R$ {item.preco.toFixed(2).replace(".", ",")}
              </Text>

              <View style={styles.controles}>
                <Pressable
                  style={styles.quantidadeBotao}
                  onPress={() =>
                    diminuirQuantidade(item.id)
                  }
                >
                  <Text style={styles.quantidadeTexto}>
                    −
                  </Text>
                </Pressable>

                <Text style={styles.quantidade}>
                  {item.quantidade}
                </Text>

                <Pressable
                  style={styles.quantidadeBotao}
                  onPress={() =>
                    aumentarQuantidade(item.id)
                  }
                >
                  <Text style={styles.quantidadeTexto}>
                    +
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    removerDoCarrinho(item.id)
                  }
                >
                  <Text style={styles.remover}>
                    Remover
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>
          Total
        </Text>

        <Text style={styles.total}>
          R$ {total.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
    },

    vazio: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },

    emoji: {
        fontSize: 70,
    },

    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },

    subtitulo: {
        fontSize: 17,
        textAlign: "center",
    },

    lista: {
        paddingBottom: 20,
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 15,
        overflow: "hidden",
        elevation: 3,
    },

    imagem: {
        width: 110,
        height: 130,
    },

    info: {
        flex: 1,
        padding: 12,
    },

    nome: {
        fontSize: 18,
        fontWeight: "bold",
    },

    preco: {
        fontSize: 16,
        marginTop: 5,
    },

    controles: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        gap: 10,
    },

    quantidadeBotao: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },

    quantidadeTexto: {
        color: "#fff",
        fontSize: 20,
    },

    quantidade: {
        fontSize: 17,
        fontWeight: "bold",
    },

    remover: {
        fontSize: 13,
        textDecorationLine: "underline",
    },

    totalContainer: {
        borderTopWidth: 1,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    totalTexto: {
        fontSize: 22,
        fontWeight: "bold",
    },

    total: {
        fontSize: 22,
        fontWeight: "bold",
    },
    
});

