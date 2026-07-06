const url = require('url');
const http = require('http');

const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    const nama = parsed.query.nama;
    const umur = parsed.query.umur;

    if(!nama || !umur){
        res.writeHead(400, {'content-type' : 'text/plain'});
        res.end('400 Bad Request');
    } 
    res.writeHead(200, {'content-type' : 'text/plain'});
    res.end(`Nama : ${nama}, Umur : ${umur}`);
});

server.listen(3000, () => {
    console.log('server di jalankan!');
})