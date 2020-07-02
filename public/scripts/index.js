
const matricula = document.querySelector("#matricula")
const senha = document.querySelector("#senha")
const email = document.querySelector("#email")

const formLogin = document.querySelector("#login")
const formRedefinir = document.querySelector("#redefinir-senha")

const endpoint_login = "https://bot-bibi2.herokuapp.com/login" 
const endpoint_redefinir = "https://bot-bibi2.herokuapp.com/auth/forgot"

var webView = new BlipChatExtension()

function logon() {
	
	var body = {
			matricula: matricula.value,
			senha: senha.value
		}
		
	fetch(endpoint_login, {
		method: 'POST',
		headers : { 
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
		})

		.then((res) => { 
			console.log(res.ok)

			if (res.ok == true) {
				alert("Login bem sucedido!")
				
				console.log(res.headers.get('authorization'))

				var token = res.headers.get('authorization')
	
				webView.sendMessage(token);
			}
			else {
				alert("Senha ou matricula errada!")
			}



		})

		.catch((error) => {
			console.log("Algo deu errado ", error)
		})

		


}
	

function redefinirSenha() {

		var body = {
			email: email.value
		}
	
		fetch(endpoint_redefinir, {
			method: 'POST',
			headers : { 
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(body)
		  })
	
		alert("Uma nova senha foi enviada para o email definido!")
	
}


	// Prevenindo evento padrão de toda vez que clicar em logan o formulário é atualizado
	formLogin.addEventListener("submit", event => {
		event.preventDefault()
	})

	// Prevenindo evento padrão de toda vez que clicar em enviar o formulário é atualizado
	formRedefinir.addEventListener("submit", event => {
		event.preventDefault()
	})


	document
		.getElementById("login")
		.addEventListener("submit", logon)

	document
		.getElementById("redefinir-senha")
		.addEventListener("submit", redefinirSenha)
	