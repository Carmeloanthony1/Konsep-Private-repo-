const http = require('http');

const server = http.createServer((req, res) => {
    const { url, method, headers } = req;
    res.setHeader('content-type', 'application/json'); //biar nanti respone nya di baca sebagai JSON
    console.log(`[LOG] : ${method} ${url}`);

    if(url === '/' && method === 'GET'){
        res.writeHead(200);
        res.end(JSON.stringify({
            message: "Selamat datang di server native bagian home"
        }));
    }

    else if(url === '/api/profile' && method === 'GET'){
        const token = headers['authorization'];
        if(token === 'Rahasia123'){
            res.writeHead(200);
            res.end(JSON.stringify({
                nama: "melo",
                prodi: "TIK",
                status: "Proved"
            }));
        } else {
            res.writeHead(401);
            res.end(JSON.stringify({
                error: "Akses di tolak!"
            }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({
            error: "ENDPOINT TIDAK DI TEMUKAN"
        }));
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`[LOG] server sudah tersambung di port ${port}`);
});