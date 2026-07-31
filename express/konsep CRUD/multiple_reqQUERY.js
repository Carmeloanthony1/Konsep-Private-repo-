const express = require('express');
const app = express();

const daftarbuku = [
    { id: 1, judul: "Belajar Express.js Dasar", kategori: "coding", tahun: 2026 },
    { id: 2, judul: "Panduan Penetration Testing Kali Linux", kategori: "cyber", tahun: 2025 },
    { id: 3, judul: "Metode Riset Sosial Desa Mekarwangi", kategori: "sosial", tahun: 2026 },
    { id: 4, judul: "Mastering C & C++ Pointers", kategori: "coding", tahun: 2026 }
];

app.get('/api/buku', (req, res) => {
    const { kategori, tahun } = req.query;
    let hasil = daftarbuku;
    if(kategori){
        hasil = hasil.filter(item => item.kategori === kategori);
    } 
    if(tahun){
        hasil = hasil.filter(item => item.tahun === Number(tahun));
    }
    if(hasil.length === 0){
        return res.status(404).json({
            error: "Buku dengan kriteria tersebut tidak di temukan"
        });
    }
    return res.status(200).json({
        total: hasil.length,
        data: hasil
    });
});

app.listen(3000, () => {
    console.log("Server berjalan di port 3000");
});