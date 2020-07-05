const matricula = document.querySelector("#matricula");
const senha = document.querySelector("#senha");
const email = document.querySelector("#email");

const form =document.querySelector(".form")

const formLogin = document.querySelector("#login");
const formRedefinir = document.querySelector("#redefinir-senha");
const fromCopyToken = document.querySelector("#copy-token")

const buttonLogin = document.querySelector("#button-login");
const submitEmail = document.querySelector("#enviar-email");

const modal = document.querySelector("#modal")
const closeModal = document.querySelector("#modal .header a")

const successLogin = document.querySelector("#success_login")
const successLoginInfo = document.querySelector("#success_login-info")

const badLogin = document.querySelector("#error_login")
const badLoginInfo = document.querySelector("#error_login-info")

const emailSent = document.querySelector("#email_sent")
const emailSentInfo = document.querySelector("#email_sent-info")

const tokenCopied = document.querySelector("#token_copied")
const tokenCopiedInfo = document.querySelector("#token_copied-info")

const buttonToken = document.querySelector("#token")

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
        buttonLogin.hidden = true
        formLogin.hidden = true

        buttonToken.hidden = false

        // 💡 Removendo class que oculta o conteúdo modal
        modal.classList.remove("hide")
        closeModal.classList.remove("hide")

        // 💡 Removendo class que oculta o conteúdo informativo
        successLogin.classList.remove("hidden")
        successLoginInfo.classList.remove("hidden")

      
    
        // 💡 Caso usuário clique no X
        closeModal.addEventListener("click", () => {
          // Ocultando o modal
          modal.classList.add("hide")
          successLogin.classList.add("hidden")
          successLoginInfo.classList.add("hidden")

          buttonToken.classList.remove("hidden")
        })

      // Caso usuário clique no botão
      buttonToken.addEventListener("click", () => {

        // 💡 Passando o token para a area de transferência
        var clipboard = document.getElementById("clipboard");
        clipboard.value = token;
        clipboard.style.display = "block";
        clipboard.select();
        document.execCommand("copy");
        clipboard.style.display = "none";

        modal.classList.remove("hide")
        closeModal.classList.add("hide")

        tokenCopied.classList.remove("hidden")
        tokenCopiedInfo.classList.remove("hidden")
      })


      } 
      else {
        // 💡 Alerta se a senha ou matricula não constarem no db
        // alert("Senha ou matricula errada!");
        // 💡 Removendo class que oculta o conteúdo modal
        modal.classList.remove("hide")
        closeModal.classList.remove("hide")
        // 💡 Removendo class que oculta o conteúdo informativo
        badLogin.classList.remove("hidden")
        badLoginInfo.classList.remove("hidden")

        // 💡 Caso usuário clique no X
        closeModal.addEventListener("click", () => {
          // Ocultando o modal
          modal.classList.add("hide")
          // add classe 'hidden'
          badLogin.classList.add("hidden")
          // Ocultando de novo a mensagem para não gerar conflito
          badLoginInfo.classList.add("hidden")
          // ocultando de novo o item 'x'
          // closeModal.classList.add("hide")
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
  submitEmail.hidden = true
  // Mostrando modal
  modal.classList.remove("hide")
  // Mostrando o botão x
  closeModal.classList.remove("hide")
  // 💡 Removendo class que oculta o conteúdo informativo
  emailSent.classList.remove("hidden")
  emailSentInfo.classList.remove("hidden")

  // 💡 Caso usuário clique no X
  closeModal.addEventListener("click", () => {
    // Ocultando o modal
    modal.classList.add("hide")
    // ocultando de novo o item 'x'
    closeModal.classList.add("hide")

    // 💡 Ocultando conteúdo para não gerar conflito
    emailSent.classList.add("hidden")
    emailSentInfo.classList.add("hidden")
  })

}


// Prevenindo evento padrão de toda vez que clicar em logan o formulário é atualizado
form.addEventListener("submit", (event) => {
  event.preventDefault()

})

// // Prevenindo evento padrão de toda vez que clicar em enviar o formulário é atualizado
// formRedefinir.addEventListener("submit", (event) => {
//   event.preventDefault()

// });

// fromCopyToken.addEventListener("submit", (event) =>{
//   event.preventDefault()
// })


document
  .getElementById("login")
  .addEventListener("submit", logon);

document
  .getElementById("redefinir-senha")
  .addEventListener("submit", redefinirSenha);



