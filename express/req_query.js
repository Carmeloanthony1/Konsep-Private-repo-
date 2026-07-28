const express = require('express');
const app = express();

const daftarbuku = [
    { id: 1, judul: "Belajar Express.js Dasar", kategori: "coding", tahun: 2026 },
    { id: 2, judul: "Panduan Penetration Testing Kali Linux", kategori: "cyber", tahun: 2025 },
    { id: 3, judul: "Metode Riset Sosial Desa Mekarwangi", kategori: "sosial", tahun: 2026 },
    { id: 4, judul: "Mastering C & C++ Pointers", kategori: "coding", tahun: 2026 }
];

app.get('/api/search', (req, res) => {
    const filterkategori = req.query.kategori;
    const hasil = daftarbuku.filter(item => item.kategori === filterkategori);

    if(hasil.length === 0){
        return res.status(404).json({
            error: "Buku yang di cari tidak ada"
        });
    }
    return res.status(200).json({
        message: `Bukunya ada ${hasil.length}`,
        data: hasil
    });
}); 

app.listen(3000);