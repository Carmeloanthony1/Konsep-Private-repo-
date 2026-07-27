const http = require('http');

const server = http.createServer((req, res) => {
    const { url, method, headers } = req;
    res.setHeader('content-type', 'application/ json');
    console.log(`[LOG] : ${method} ${url}`)

    if(url === '/' && method === 'GET'){
        res.writeHead(200);
        res.end(JSON.stringify({
            message: "Ini adalah page home"
        }));
    } else if(url === '/api/menu' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            menu : ['Espresso', 'Americano', 'Kopi Susu Gula Aren']
        }));
    } else if(url === '/api/pesan' && method === 'POST'){
        const token = headers['authorization'];
        if(token === 'Kopienak123'){
            res.writeHead(201);
            res.end(JSON.stringify({
                message: "Kopi susu gula arena berhasil di buat", status: "Diproses"
            }));
        } else {
            res.writeHead(401);
            res.end(JSON.stringify({
                message: "Token salah!"
            }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({
            error: "Routing salah!"
        }));
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`[LOG] Server terhubung ke ${port}`);
});