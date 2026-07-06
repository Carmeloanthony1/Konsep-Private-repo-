const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.writehead(200, {'content-type' : 'text/plain'});
        res.end('about');
    } else if (req.url === '/about'){
        res.writehead(200, {'content-type' : 'text/plain'});
        res.end('about');
    } else {
        res.writehead(404, {'content-type' : 'text/plain'});
        res.end('404 not found');
    }
});

server.listen(3000, () =>{
    console.log("Server dijalankan");
});

//req info yang datang tadi website
//res itu info yang dikirim ke website