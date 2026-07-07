const express = require('express');
const app = express();

app.get('/api/soal', (req, res) => {
    res.send('mengambil semua soal');
});

app.post('/api/soal', (req, res) => {
    res.send('soal baru berhasil di tambahkan');
});

app.put('/api/soal/:id', (req, res) => {
    res.send('soal ${req.params.id} berhasil di update');
});

app.delete('/api/soal/:id', (req, res) => {
    res.send('soal ${req.params.id} berhasil di hapus');
});

app.listen(3000, () =>{
    console.log("Server berjalan di port 3000");
});