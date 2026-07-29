const express = require('express');
const app = express();

const daftarbuku = [
    { id: 1, judul: "Belajar Express.js Dasar", kategori: "coding", status: "tersedia" },
    { id: 2, judul: "Panduan Penetration Testing Kali Linux", kategori: "cyber", status: "dipinjam" },
    { id: 3, judul: "Metode Riset Sosial Desa Mekarwangi", kategori: "sosial", status: "tersedia" },
    { id: 4, judul: "Mastering C & C++ Pointers", kategori: "coding", status: "dipinjam" },
    { id: 5, judul: "Arsitektur Jaringan Komputer", kategori: "cyber", status: "tersedia" }
];

app.get('/api/buku/:kategori', (req, res) => {
    const kategori = req.params.kategori;
    const status = req.query.status;

    let hasil = daftarbuku.filter(item => item.kategori === kategori);
    if(status){
        hasil = hasil.filter(item => item.status === status);
    }

    if(hasil.length === 0){
        return res.status(404).json({
            error: `Buku dengan kategori ${kategori} tidak di temukan`
        });
    }
    return res.status(200).json({
        message: `Buku dengan kategori ${kategori} telah di temukan`,
        total: hasil.length,
        data: hasil
    });
});

app.listen(3000, () => {
    console.log("server masuk ke port 3000");
});