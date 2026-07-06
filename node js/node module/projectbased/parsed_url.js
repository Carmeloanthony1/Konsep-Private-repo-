const url = require('url');
const http = require('http');

const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);

    if(parsed.pathname === '/'){
        res.writeHead(200, {'content-type' : 'text/plain'});
        res.end('Home');
    } else if (parsed.pathname === '/profile'){
        const name = parsed.query.name;
        const age = parsed.query.age;
        if(!name || !age){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.end('400 Bad Request'); 
            return;
        }
        res.writeHead(200, {'content-type' : 'text/plain'});
 
        res.end(`Hai ${name}, kamu berumur ${age}`);


    } else if (parsed.pathname === '/produk'){
        const category = parsed.query.category;
        if(!category){
            res.writeHead(400, {'content-type' : 'text/plain'});
            res.end('400 Bad Request');
            return;
        }
        res.writeHead(200, {'content-type' : 'text/plain'});
        res.end(`produk ${category} lagi diskon 100%`);

    } else if (parsed.pathname === ''){
        res.writeHead(400, {'content-type' : 'text/plain'});
        res.end('400 Bad Request');
    } else {
        res.writeHead(404, {'content-type' : 'text/plain'});
        res.end ('404 not found');
    }
});

server.listen(3000, () => {
    console.log("Server di jalankan");
})