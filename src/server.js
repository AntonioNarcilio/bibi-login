const express = require("express")
const server = express()
const bodyParser = require("body-parser")


// 💡 Passando a porta a ser utilizada
// 💡 config de porta no heroku 'process.env.PORT'
const PORT = process.env.PORT || 8080

// Verificar em "https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions"
server.use(bodyParser.urlencoded({ extended: true }))

// Receber todos os dados pelo método POST e converter para JSON
server.use(bodyParser.json())

// 💡 Configurando pasta publica
server.use(express.static("public"))


// 💡 Configurando rota da pagina principal
server.get("/", (request, response) => {


	// 💡 Passando o arquivo a ser mostrado
	return response.sendFile(__dirname + "/views/index.html")
})



// 💡 Ligando o servidor
server.listen(PORT)