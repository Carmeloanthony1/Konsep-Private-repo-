const express = require('express');
const app = express();

app.use(express.json());

const barangToko = [
    { id: 1, nama: "Kopi Hitam", kategori: "minuman", harga: 5000 },
    { id: 2, nama: "Roti Cokelat", kategori: "makanan", harga: 7000 }
];

app.get('/api/barang', (req, res) => {
    const kategori = req.query.kategori;
    let hasil = barangToko;
    
    if(kategori){
        hasil = hasil.filter(item => item.kategori === kategori);
    }

    if(hasil.length === 0){
        return res.status(404).json({
            error: "Barang yang di cari, tidak ada"
        });
    }
    return res.status(200).json({
        message: `Barang dengan kategori ${kategori} di temukan`,
        total: barangToko.length,
        hasil: hasil
    });
});

app.post('/api/barang', (req, res) => {
    const { nama, kategori, harga } = req.body;
    if(!nama || !kategori || !harga){
        return res.status(400).json({
            error: "Seluruh bagian perlu di isi, jika ingin menambahkan"
        });
    }

    const barangbaru = {
        id: barangToko.length + 1,
        nama: nama,
        kategori: kategori,
        harga: harga
    }

    barangToko.push(barangbaru);

    return res.status(200).json({
        message: "Data sudah di tambahkan",
        total:barangToko.length, 
        data: barangbaru
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server nyala di port ${port}`)
});