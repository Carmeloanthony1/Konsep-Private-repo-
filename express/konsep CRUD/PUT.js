const express = require('express');
const app = express();

app.use(express.json());

const keranjang = [
    { id: 1, produk: "Mouse Gaming", kategori: "elektronik", harga: 150000, qty: 1 },
    { id: 2, produk: "Kaos Polos", kategori: "pakaian", harga: 50000, qty: 2 }
];
app.get('/api/keranjang', (req, res) => {
    return res.status(200).json({
        message: "Menampilkan seluruh data",
        data: keranjang
    });
});

app.put('/api/keranjang/:id', (req, res) => {
    const idCHANGE = parseInt(req.params.id);
    const { produk, kategori, harga, qty } = req.body;

    const index = keranjang.findIndex(item => item.id === idCHANGE);

    if(index === -1){
        return res.status(404).json({
            error: "Barang tidak ada"
        });
    }

    keranjang[index] = {
        id: idCHANGE,
        produk:produk || keranjang[index].produk,
        kategori:kategori || keranjang[index].kategori,
        harga:harga || keranjang[index].harga,
        qty:qty || keranjang[index].qty
    }
    //biar amanin aja, nanti kalau user hanya input qty or harga, sisanya pakai nilai lama yang ada di array/memori

    return res.status(200).json({
        message: `Berhasil mengubah index ${idCHANGE}`,
        data: keranjang[index]
    });
});

app.listen(3000, () => {
    console.log("Server terhubung di port 3000");
});