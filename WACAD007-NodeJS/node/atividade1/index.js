const http = require("http")
const fs = require("fs")

if (process.argv.length < 3) {
    throw new Error("Número de argumentos inválido")
}
const PORT =  3333
const dir = process.argv[2]

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/html;charset=utf-8" })
    console.log(req.url);
    if (req.url === "/") {
        fs.readdir(dir, (err, files) => {
            if (err) throw new Error(err); 1
            files.forEach((file) => res.write(file+`<br>`));
            res.end()
        })
    } else if (req.url.includes('favicon.ico')) {
        res.end()
    }
    else {
    fs.readFile(`.${req.url}`, "utf-8", (err, content) => {
        if (err) throw new Error(err)
        res.end()
    })
}
})

server.listen(PORT, () => {
    console.log(`servidor iniciado na porta ${PORT}`)
});