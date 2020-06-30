const express = require("express")
const server = express()

// 💡 Passando a porta a ser utilizada
const PORT = process.env.PORT || 8080


// 💡 Configurando pasta publica
server.use(express.static("public"))


// 💡 Configurando rota da pagina principal
server.get("/", (request, response) => {

	// 💡 Passando o arquivo a ser mostrado
	return response.sendFile(__dirname + "/views/index.html")
})



// 💡 Ligando o servidor
server.listen(PORT)