const inputname = document.getElementById("inputname");
const inputemail = document.getElementById("inputemail");
const inputsenha = document.getElementById("inputsenha");
const botaocadastre = document.getElementById("cadastre");
const mensagem = document.getElementById("mensagem");

botaocadastre.addEventListener("click", function () {

const email = inputemail.value;
const name = inputname.value;
const senha = inputsenha.value;
    console.log(email, name, senha);

  if (name === "" || email === "" || senha === "") {
    alert("Preencha todas as informações para fazer o cadastro");
    return;
  }

  const novoUsuario = {
    name: name,
    email: email,
    senha: senha
  };

  fetch("/cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoUsuario),
  })
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
      mensagem.textContent =
        "Usuário " + dados.name + " cadastrado com sucesso!";
    })
    .catch(function (erro) {
      mensagem.textContent = "Erro ao cadastrar. Tente novamente.";
      console.error(erro);
    });
});
