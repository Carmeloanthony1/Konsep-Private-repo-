const express = require('express');
const app = express();

app.use(express.json());

const daftarProduk = [
    { id: 1, nama: "Laptop Gaming", kategori: "elektronik", harga: 12000000, stok: 5 },
    { id: 2, nama: "Kemeja Flanel", kategori: "pakaian", harga: 250000, stok: 15 }
];

app.get('/api/produk', (req, res) => {
    const kategori = req.query.kategori;
    let hasil = daftarProduk;
    if(kategori){
        hasil = daftarProduk.filter(item => item.kategori === kategori);
    }
    if(hasil.length === 0){
        return res.status(404).json({
            error: `Produk dengan kategori ${kategori}, tidak di temukan`
        });
    }
    return res.status(200).json({
        message: `Produk dengan kategori yang di cari telah di temukan, berikut daftarnya`,
        total: hasil.length,
        hasil: hasil
    });
});

app.post('/api/produk', (req, res) => {
    const { nama, kategori, harga, stok } = req.body;
    if(!nama || !kategori || !harga || !stok){
        return res.status(404).json({
            error: "Silahkan mengisi seluruh bagan yang di perlukan"
        });
    }
    const produkbaru = {
        id: daftarProduk.length + 1,
        nama: nama,
        kategori:kategori,
        harga:harga,
        stok:stok
    }
    daftarProduk.push(produkbaru);

    return res.status(201).json({
        message: `Berhasil menambahkan produk, berikut data mengenai produk yang baru di tambahkan`,
        total: daftarProduk.length,
        hasil: produkbaru
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server terkoneksi dengan port ${port}`);
});