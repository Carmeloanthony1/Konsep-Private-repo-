const express = require('express');
const app = express();

app.use(express.json());

const layananBisnis = [
    { id: 1, nama: "Web Development", harga: 5000000 },
    { id: 2, nama: "UI/UX Design", harga: 3000000 },
    { id: 3, nama: "SEO Audit", harga: 1500000 }
];

app.get('/api/layanan', (req, res) => {
    return res.status(200).json({
        message: "Menampilkan seluruh data yang ada",
        data: layananBisnis
    });
});

app.post('/api/layanan', (req, res) => {
    const { nama, harga } = req.body;
    if(!nama || !harga){
        return res.status(404).json({
            error: "Silahkan isi seluruh bagian"
        });
    }

    const layananbaru = {
        id: layananBisnis.length + 1,
        nama: nama,
        harga: harga
    }

    layananBisnis.push(layananbaru);

    return res.status(200).json({
        message: "Data yang di tambahkan akan di tampilkan",
        total: layananBisnis.length,
        data: layananbaru,
    });
});

app.put('/api/layanan/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nama, harga } = req.body;

    const index = layananBisnis.findIndex(item => item.id === id);
    if(index === -1){
        return res.status(404).json({
            error: "Layanan tidak ada"
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

app.listen(3000, () => {
    console.log("Server terkoneksi di port 3000");
});