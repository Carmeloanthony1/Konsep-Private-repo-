const express = require('express');
const app = express();

app.use(express.json());

const keranjang = [
    { id: 1, produk: "Mouse Gaming", kategori: "elektronik", harga: 150000, qty: 1 },
    { id: 2, produk: "Kaos Polos", kategori: "pakaian", harga: 50000, qty: 2 }
];

app.get('/api/keranjang', (req, res) => {
    const kategori = req.query.kategori;
    let hasil = keranjang;

    if(kategori){
        hasil = keranjang.filter(item => item.kategori === kategori);
    }
    if(hasil.length === 0){
        return res.status(404).json({
            error: "Tidak terdapat barang yang di mau"
        });
    }
    return res.status(200).json({
        message: "Barang yang di cari ada",
        total: hasil.length,
        data: hasil
    });
});

app.post('/api/keranjang', (req, res) => {
    const { produk, kategori, harga, qty} = req.body;
    if(!produk || !kategori){
        return res.status(404).json({
            error: "Silahkan isi, produk ataupun kategorinya"
        });
    }

    const produkbaru = {
        id: keranjang.length + 1,
        produk: produk,
        kategori: kategori,
        harga: harga,
        qty: qty
    }

    keranjang.push(produkbaru);

    return res.status(200).json({
        message: "Menampilkan seluruh produk yang sesuai",
        total: keranjang.length,
        data: produkbaru
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`SERVER TERHUBUNG DI PORT ${port}`);
});