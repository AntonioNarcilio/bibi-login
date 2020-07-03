const matricula = document.querySelector("#matricula");
const senha = document.querySelector("#senha");
const email = document.querySelector("#email");

const formLogin = document.querySelector("#login");
const formRedefinir = document.querySelector("#redefinir-senha");

const buttonLogin = document.querySelector("#button-login");
const submitEmail = document.querySelector("#enviar-email");

const modal = document.querySelector("#modal")
const closeModal = document.querySelector("#modal .header a")

const successLogin = document.querySelector("#modal .header #sucesso")
const successInfo = document.querySelector("#sucesso-info")

const errorInfo = document.querySelector("#error-info")
const badLogin = document.querySelector("#modal .header #erro")

const emailSent = document.querySelector("#redefinir")
const emailInfo = document.querySelector("#email-info")

const endpoint_login = "https://bot-bibi2.herokuapp.com/login";
const endpoint_redefinir = "https://bot-bibi2.herokuapp.com/auth/forgot";


// 💡 Função a ser executada quando usuário tentar fazer login
function logon() {
  var body = {
    matricula: matricula.value,
    senha: senha.value,
  };

    fetch(endpoint_login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then((res) => {
      // console.log(res.ok);

      if (res.ok == true) {
        // 💡 Alertando caso o login seja bem sucedido
        // alert("Login bem sucedido!");

        // 💡 Pegando o token
        var token = res.headers.get("authorization");
        // console.log("Retornou o token 🔑\n" + token);

        // 💡 Desabilitando botão para não fazer mais solicitações
        buttonLogin.disabled = true

        // 💡 Removendo class que oculta o conteúdo modal
        modal.classList.remove("hide")
        // 💡 Removendo class que oculta o conteúdo informativo
        successLogin.classList.remove("hidden")
        successInfo.classList.remove("hidden")


        // 💡 Passando o token para a area de transferência
        var clipboard = document.getElementById("clipboard");
        clipboard.value = token;
        clipboard.style.display = "block";
        clipboard.select();
        document.execCommand("copy");
        clipboard.style.display = "none";

      } 
      else {
        // 💡 Alerta se a senha ou matricula não constarem no db
        // alert("Senha ou matricula errada!");
        // 💡 Removendo class que oculta o conteúdo modal
        modal.classList.remove("hide")
        closeModal.classList.remove("hide")
        // 💡 Removendo class que oculta o conteúdo informativo
        badLogin.classList.remove("hidden")
        errorInfo.classList.remove("hidden")

        // 💡 Caso usuário clique no X
        closeModal.addEventListener("click", () => {
          // Ocultando o modal
          modal.classList.add("hide")
          // add classe 'hidden'
          badLogin.classList.add("hidden")
          // Ocultando de novo a mensagem para não gerar conflito
          errorInfo.classList.add("hidden")
          // ocultando de novo o item 'x'
          closeModal.classList.add("hide")
        })
      }
    })

    .catch((error) => {
      console.log("Algo deu errado ", error);
    });
}


// 💡 Função a ser executada quando usuário tentar redefinir a senha
function redefinirSenha() {

  // Pegando o valor do campo input 'email'
  var body = {
    email: email.value,
  };

    fetch(endpoint_redefinir, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

  // 💡 Desabilitando botão para não fazer mais solicitações
  submitEmail.disabled = true
  // Mostrando modal
  modal.classList.remove("hide")
  // Mostrando o botão x
  closeModal.classList.remove("hide")
  // 💡 Removendo class que oculta o conteúdo informativo
  emailSent.classList.remove("hidden")
  emailInfo.classList.remove("hidden")

  // 💡 Caso usuário clique no X
  closeModal.addEventListener("click", () => {
    // Ocultando o modal
    modal.classList.add("hide")
    // ocultando de novo o item 'x'
    closeModal.classList.add("hide")

    // 💡 Ocultando conteúdo para não gerar conflito
    emailSent.classList.add("hidden")
    emailInfo.classList.add("hidden")
  })

}


// Prevenindo evento padrão de toda vez que clicar em logan o formulário é atualizado
formLogin.addEventListener("submit", (event) => {
  event.preventDefault();

});

// Prevenindo evento padrão de toda vez que clicar em enviar o formulário é atualizado
formRedefinir.addEventListener("submit", (event) => {
  event.preventDefault();

});


document
  .getElementById("login")
  .addEventListener("submit", logon);

document
  .getElementById("redefinir-senha")
  .addEventListener("submit", redefinirSenha);

