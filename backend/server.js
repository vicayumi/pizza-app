const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/images",
  express.static(path.join(__dirname, "../assets/images"))
);

app.get("/", (req, res) => {
  res.json({
    mensagem: "Backend da Pizza App funcionando! 🍕",
  });
});

app.get("/pizzas", async (req, res) => {
  try {
    const [pizzas] = await db.query("SELECT * FROM pizzas");

    res.json(pizzas);
  } catch (erro) {
    console.error("Erro ao buscar pizzas:", erro);

    res.status(500).json({
      mensagem: "Erro ao buscar pizzas.",
      erro: erro.message,
    });
  }
});

app.get("/pizzas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [pizzas] = await db.query(
      "SELECT * FROM pizzas WHERE id = ?",
      [id]
    );

    if (pizzas.length === 0) {
      return res.status(404).json({
        mensagem: "Pizza não encontrada.",
      });
    }

    res.json(pizzas[0]);
  } catch (erro) {
    console.error("Erro ao buscar pizza:", erro);

    res.status(500).json({
      mensagem: "Erro ao buscar pizza.",
      erro: erro.message,
    });
  }
});

app.get("/teste-db", async (req, res) => {
  try {
    const [resultado] = await db.query("SELECT 1 AS teste");

    res.json({
      mensagem: "MySQL conectado com sucesso! 🎉",
      resultado,
    });
  } catch (erro) {
    console.error("Erro ao conectar com MySQL:", erro);

    res.status(500).json({
      mensagem: "Erro ao conectar com MySQL.",
      erro: erro.message,
    });
  }
});

app.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: "Nome, email e senha são obrigatórios.",
      });
    }

    // Verifica se o email já está cadastrado
    const [usuarios] = await db.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (usuarios.length > 0) {
      return res.status(400).json({
        mensagem: "Este email já está cadastrado.",
      });
    }

    // Cria o hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Salva o usuário no banco
    const [resultado] = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senhaHash]
    );

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: {
        id: resultado.insertId,
        nome,
        email,
      },
    });
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro);

    res.status(500).json({
      mensagem: "Erro ao cadastrar usuário.",
      erro: erro.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se os campos foram preenchidos
    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "Email e senha são obrigatórios.",
      });
    }

    // Procura o usuário pelo email
    const [usuarios] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    // Usuário não encontrado
    if (usuarios.length === 0) {
      return res.status(401).json({
        mensagem: "Email ou senha incorretos.",
      });
    }

    const usuario = usuarios[0];

    // Compara a senha digitada com o hash salvo no banco
    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        mensagem: "Email ou senha incorretos.",
      });
    }

    // Login realizado
    res.json({
      mensagem: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);

    res.status(500).json({
      mensagem: "Erro ao fazer login.",
      erro: erro.message,
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});