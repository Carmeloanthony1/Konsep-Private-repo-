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

app.post('/api/pertanyaan', (req, res) => {
    const {pertanyaan, tipe} = req.body; // inisialisasi jadi req.body biar nanti bisa di panggil sama user
    if (!pertanyaan || !tipe){
        res.status(400).json({message: 'Data tidak sesuai', error: 'err.message'});
        return;
    }
    db.query('INSERT INTO `SOAL` (pertanyaan, tipe) VALUES(?, ?)', [pertanyaan, tipe], 
        (err, result) => {
            if(err){
                res.status(500).json({message: 'Gagal menambahkan pertanyaan', error: err.message});
            } else {
                res.status(201).json({message: 'Berhasil menambahkan pertanyaan', data: result});
            }
        }
    );
});

app.put('/api/pertanyaan/:id', (req, res) => {
    const {pertanyaan, tipe} = req.body;
    db.query('UPDATE SOAL SET pertanyaan = ?, tipe = ? WHERE ID = ?', [pertanyaan, tipe, req.params.id], (err, result) => {
        if(err){
            res.status(500).json({message: "Gagal mengupdate data", error: err.message});
            return;
        } else if(result.affectedRows === 0){ //kalau id nya ga ketemu maka
            res.status(404).json({message: `${req.params.id} tidak di temukan`});
            return;
        } else {
            res.status(200).json({message: "Berhasil mengupdate data", data: result});
        }
    })
});

app.delete('/api/pertanyaan/:id', (req, res) => {
    db.query('DELETE FROM `SOAL` WHERE ID = ?', [req.params.id], (err, result) => {
        if(err){
            res.status(500).json({message: "GAGAL MENGHAPUS DATA", error: err.message});
            return;
        } else if(result.affectedRows === 0 ){
            res.status(404).json({message: `${req.params.id} tidak di temukan`});
        }
        res.status(200).json({message: "Berhasil menghapus data", data: result});
    });
});
app.listen(3000, () => {
    console.log("Server berjalan di port 3000");
});