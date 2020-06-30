const login = document.getElementById("login")
const matricula = document.getElementById("matricula")
const senha = document.getElementById("senha")

const esqueceu_senha = document.getElementById("redefinir-senha")
const email = document.getElementById("email")



login.addEventListener("submit", () => {

	alert(
		"Matricula: " + matricula.value +
		"\nSenha: " + senha.value
	)

	console.log(matricula.value)
	console.log(senha.value)

})



esqueceu_senha.addEventListener("submit", () => {

	alert(
		"Email: " + email.value
	)

	console.log(email.value)

})