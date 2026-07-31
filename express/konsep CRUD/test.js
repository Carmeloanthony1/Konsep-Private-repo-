const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Selamat datang di home"
    });
});

app.get('/api/menu', (req, res) => {
    res.status(200).json({
        menu: ['espresso', 'Americano', 'Kopi Susu Gula Aren']
    });
});

app.post('/api/pesan', (req, res) => {
    const token = req.headers['authorization'];
    const { menu, jumlah } = req.body;

    if(token !== 'Kopimantapbjir'){
        return res.status(401).json({ error: "Token salah, silakan masukkan ulang"});
    } 

    if(!menu || !jumlah){
        return res.status(400).json({ error: "Menu dan jumlah harus di isi"});
    }

    res.status(201).json({
        message: `pesanan ${jumlah} dan ${menu} berhasil di buat`,
        status: "Diproses"
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});