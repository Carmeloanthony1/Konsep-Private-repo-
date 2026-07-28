const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/favicon.ico'){
        res.writeHead(204);
        return res.end();
    }
    
    const { url, method, header } = req;

    res.setHeaders('content-type', 'application/json');
    console.log(`[LOG] ${method} ${url}`);

    if(url === '/api/register' && method === 'POST'){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
    }
});