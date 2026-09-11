// server.js
//
// Este é o nosso servidor. Ele fica "escutando" numa porta do
// computador, esperando que o navegador faça pedidos (requisições).
//
// Repare que é o MESMO JavaScript que vocês já usaram no Node:
// variáveis, funções, if/else. A única novsenha aqui é o Express,
// uma ferramenta que nos dá o "esqueleto" pronto de um servidor web.

const express = require("express");
const { salvarUsuario, listarUsuarios } = require("./bancoDeDados");

const app = express();
const PORTA = 3000;

// Middleware: permite que o servidor entenda JSON enviado pelo front-end
app.use(express.json());

// Middleware: serve os arquivos da pasta "public" diretamente.
// Ou seja, o index.html, script.js e style.css ficam acessíveis
// no navegador sem precisarmos criar uma rota manual para cada um.
app.use(express.static("public"));

// ROTA 1: receber o cadastro vindo do formulário
// O front-end vai chamar isso com fetch(..., { method: "POST" })
app.post("/cadastrar", (req, res) => {
    const { name, email, senha } = req.body;

    // Validação simples no servidor (além da validação que já
    // fazemos no front-end com alert)
    if (!name || !email || !senha) {
        return res.status(400).json({
            erro: "Preencha name, email e senha."
        });
    }

    const novoUsuario = salvarUsuario(name, email, senha);

    // 201 = "Created" -> conseguimos criar o recurso com sucesso
    res.status(201).json(novoUsuario);
});

// ROTA 2: listar todos os usuários cadastrados até agora
// O front-end da página de listagem vai chamar isso com fetch(...)
app.get("/usuarios", (req, res) => {
    const usuarios = listarUsuarios();
    res.json(usuarios);
});

// Liga o servidor e mantém ele "escutando" a porta 3000
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});