const express = require('express');
const app = express();

app.use(express.json());

const daftarbuku = [
    { id: 1, judul: "Belajar Express.js Dasar", kategori: "coding" },
    { id: 2, judul: "Panduan Penetration Testing Kali Linux", kategori: "cyber" }
];

app.post('/api/buku', (req, res) => {
    const { judul, kategori } = req.body;
    if(!judul || !kategori){
        return res.status(404).json({
            error: `Judul dan kategori perlu di isi`
        });
    } 
    const bukuBaru = {
        id: daftarbuku.length + 1,
        judul: judul,
        kategori: kategori
    };

    daftarbuku.push(bukuBaru);
    return res.status(200).json({
        message: "Buku berhasil di tambahkan",
        total: daftarbuku.length,
        data: bukuBaru
    });
});

app.get('/api/buku', (req, res) => {
    return res.status(200).json({
        data: daftarbuku
    });
});

app.listen(3000, () => {
    console.log("Server terhubung di port 3000");
});