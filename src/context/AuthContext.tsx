import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Usuario = {
  id: number;
  nome: string;
  email: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  entrar: (usuario: Usuario) => void;
  sair: () => void;
};

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  function entrar(usuario: Usuario) {
    setUsuario(usuario);
  }

  function sair() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        entrar,
        sair,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser usado dentro de AuthProvider"
    );
  }

  return context;
}