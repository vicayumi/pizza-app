import { ImageSourcePropType } from "react-native";

export type Pizza = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: ImageSourcePropType;
};

export const pizzas: Pizza[] = [
  {
    id: "1",
    nome: "Calabresa",
    descricao: "Molho de tomate, queijo, calabresa e cebola.",
    preco: 39.9,
    imagem: require("../../assets/images/calabresa.png"),
  },

  {
    id: "2",
    nome: "Margherita",
    descricao: "Molho de tomate, queijo, tomate e manjericão.",
    preco: 42.9,
    imagem: require("../../assets/images/margherita.png"),
  },

  {
    id: "3",
    nome: "Frango com Catupiry",
    descricao: "Frango desfiado, queijo e catupiry.",
    preco: 44.9,
    imagem: require("../../assets/images/frango.png"),
  },

  {
    id: "4",
    nome: "Quatro Queijos",
    descricao: "Muçarela, parmesão, provolone e gorgonzola.",
    preco: 46.9,
    imagem: require("../../assets/images/queijo.png"),
  },
];