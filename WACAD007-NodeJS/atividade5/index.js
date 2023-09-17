const http = require("http")
const fs = require("fs")
const createLink = require("./createlink.js")
if (process.argv.length < 3) {
    throw new Error("Número de argumentos inválido")
}
const PORT = process.env.PORT ?? 5555
const dir = process.argv[2]

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/html;charset=utf-8" })
    console.log(req.url);
    if (req.url === "/") {
        fs.readdir(dir, (err, files) => {
            if (err) throw new Error(err); 1
            files.forEach((file) => res.write(createLink(dir,file)));
            res.end()
        })
    } else if (req.url.includes('favicon.ico')) {
        res.end()
    }
    else {
    fs.readFile(`.${req.url}`, "utf-8", (err, content) => {
        if (err) throw new Error(err)
        const voltar=`<a href="/">Voltar</a><br>\n`+content
        res.end(voltar)
    })
}
})

server.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`)
});