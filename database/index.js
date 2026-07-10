const express = require('express');
const app = express();
const db = require('./database');
const cors = require('cors');

app.use(express.json());
app.use(cors({origin : 'http://localhost:5173'}));

app.get('/api/pertanyaan', (req, res) => {
    db.query('SELECT * FROM `SOAL`', (err, result) => {
        if(err){
            res.status(500).json({message: 'Gagal mengambil pertanyaan', error: err.message});
            return;
        }
        res.status(200).json({message:"Berhasil mengambil data", data: result});
    });
});

app.listen(3000, () => {
    console.log("Server berjalan di port 3000");
});