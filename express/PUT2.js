const express = require('express');
const app = express();

app.use(express.json());

const layananBisnis = [
    { id: 1, nama: "Web Development", harga: 5000000 },
    { id: 2, nama: "UI/UX Design", harga: 3000000 },
    { id: 3, nama: "SEO Audit", harga: 1500000 }
];

app.put('/api/layanan/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const { nama, harga } = req.body;

    const index = layananBisnis.findIndex(item => item.id === id);
    if(index === -1){
        return res.status(404).json({
            error: "Tidak terdapat data yang sesuai"
        });
    }

    layananBisnis[index] = {
        id: id || layananBisnis[index].id,
        nama: nama || layananBisnis[index].nama,
        harga: harga || layananBisnis[index].harga
    }

    return res.status(200).json({
        message: `Data yang terkait berhasil di ubah`,
        data: layananBisnis[index]
    });
});

app.get('/api/layanan', (req, res) => {
    return res.status(200).json({
        message: "Menampilkan seluruh data yang ada",
        data: layananBisnis
    });
});

app.listen(3000, () => {
    console.log("SERVER CONNECT DI PORT 3000");
});
