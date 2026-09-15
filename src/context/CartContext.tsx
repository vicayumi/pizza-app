import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Pizza = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
};

type CartItem = Pizza & {
  quantidade: number;
};

type CartContextType = {
  cartItems: CartItem[];
  adicionarAoCarrinho: (
    pizza: Pizza,
    quantidade?: number
  ) => void;
  aumentarQuantidade: (id: string) => void;
  diminuirQuantidade: (id: string) => void;
  removerDoCarrinho: (id: string) => void;
  total: number;
};

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    []
  );

  function adicionarAoCarrinho(
    pizza: Pizza,
    quantidade: number = 1
  ) {
    setCartItems((items) => {
      const itemExistente = items.find(
        (item) => item.id === pizza.id
      );

      if (itemExistente) {
        return items.map((item) =>
          item.id === pizza.id
            ? {
                ...item,
                quantidade:
                  item.quantidade + quantidade,
              }
            : item
        );
      }

      return [
        ...items,
        {
          ...pizza,
          quantidade,
        },
      ];
    });
  }

  function removerDoCarrinho(id: string) {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  }

  function aumentarQuantidade(id: string) {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: item.quantidade + 1,
            }
          : item
      )
    );
  }

  function diminuirQuantidade(id: string) {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  const total = cartItems.reduce(
    (soma, item) =>
      soma + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        adicionarAoCarrinho,
        removerDoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart deve ser usado dentro de CartProvider"
    );
  }

  return context;
}