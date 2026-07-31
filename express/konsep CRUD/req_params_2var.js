const express = require('express');
const app = express();

const daftarbuku = [
    { id: 1, judul: "Belajar Express.js Dasar", kategori: "coding", tahun: 2026 },
    { id: 2, judul: "Panduan Penetration Testing Kali Linux", kategori: "cyber", tahun: 2025 },
    { id: 3, judul: "Metode Riset Sosial Desa Mekarwangi", kategori: "sosial", tahun: 2026 },
    { id: 4, judul: "Mastering C & C++ Pointers", kategori: "coding", tahun: 2026 }
];

app.get('/api/buku/:kategori/:tahun', (req, res) => {
    const tahunbuku = Number(req.params.tahun);
    const kategoribuku = req.params.kategori;

    const hasil = daftarbuku.filter(item => item.tahun === tahunbuku && item.kategori === kategoribuku); //find ambil 1, filter ambil semua
    if(hasil.length === 0){
        return res.status(404).json({
            error: "Tidak menemukan buku yang di inginkan"
        });
    } 
    return res.status(200).json({ 
        message: `Buku dengan kategori ${kategoribuku} dan tahun terbitan ${tahunbuku} yang anda mau telah di temukan`,
        data: hasil
    });
});

app.listen(3000);