const http = require('http');

const server = http.createServer((req, res) => {
    const { url, method, headers } = req;
    res.setHeader('content-type', 'application/json'); //biar nanti respone nya di baca sebagai JSON
    console.log(`[LOG] : ${method} ${url}`);
});
