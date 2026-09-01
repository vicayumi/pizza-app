import { router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { pizzas } from "../../data/pizzas";

export default function CardapioScreen() {
    return (
        <View style={styles.container}>
    
        <Text style={styles.title}>Nosso Cardápio 🍕</Text>

        <Text style={styles.subtitle}>
            Escolha sua pizza favorita
        </Text>

        <FlatList
            data={pizzas}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.lista}
            renderItem={({ item }) => (
        <Pressable
            style={styles.card}
            onPress={() =>
                router.push({
                pathname: "/pizza/[id]",
                params: {
                    id: item.id,
                },
                })
            }
        >
                
                <Image
                  // 2. Removemos as chaves e a palavra "uri", passamos o item.imagem direto!
                  source={item.imagem} 
                  style={styles.imagem}
                />

                <View style={styles.informacoes}>
                <Text style={styles.nome}>{item.nome}</Text>

                <Text style={styles.descricao}>
                    {item.descricao}
                </Text>

                <View style={styles.rodape}>
                    <Text style={styles.preco}>
                    R$ {item.preco.toFixed(2).replace(".", ",")}
                    </Text>

                </View>
                </View>
            </Pressable> )}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 20,
    },
    lista: {
        paddingBottom: 30,
    },
    card: {
        borderRadius: 16,
        marginBottom: 20,
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 4,
    },
    imagem: {
        width: "100%",
        height: 180,
    },
    informacoes: {
        padding: 16,
    },
    nome: {
        fontSize: 21,
        fontWeight: "bold",
    },
    descricao: {
        fontSize: 14,
        marginTop: 6,
        lineHeight: 20,
    },
    rodape: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15,
    },
    preco: {
        fontSize: 18,
        fontWeight: "bold",
    },
 
});