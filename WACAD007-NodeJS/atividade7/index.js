import http from 'http'
import {promises as fs} from 'fs'

if (process.argv.length < 3) {
    throw new Error("Número de argumentos inválido")
}
const PORT = process.env.PORT ?? 5555
const dir = process.argv[2]


const server = http.createServer(async (req, res) => {
    switch (req.url) {
        case '/':
          res.writeHead(200, {'Content-Type': 'text/html'});
          const html = await readFile('index.html')
          res.write(html); 
          res.end();
          break;
        
        case '/style.css':
          res.writeHead(200, {'Content-Type': 'text/css'});
          const css = await readFile('style.css')
          res.write(css); 
          res.end();
          break;   
        
        case '/script.js':
          res.writeHead(200, {'Content-Type': 'text/plain'});
          const js = await readFile('script.js');
          res.write(js); 
          res.end();
          break;  
    
        default:
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.write('error'); 
          res.end();
          break;
       } 
})
server.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`)
});


async function readFile(fileName){
    const filepath = `${dir}/${fileName}`
    try {
        return await fs.readFile(filepath, 'utf8');
    }
    catch (err) {
        console.log(err);
    }
}