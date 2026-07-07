const express = require('express');
const app = express();

let soal = [
    { id: 1, soal: '1+1 = ?'},
    { id: 2, soal: '2+2 = ?'},
    { id: 3, soal: '3+3 = ?'}
];

app.get('/api/soal', (req, res) => {
    res.json({
        message: "berhasil", 
        data: soal
    });
});

app.post('/api/soal', (req, res) => { //menambah data baru ke dalam memori
    const soalbaru = {id: soal.length + 1, soal: '4+4 = ?'};
    soal.push(soalbaru);
    res.json({
        message: "berhasil", data: soal
    });
});

app.delete('/api/soal/:id', (req, res) => {
    soal = soal.filter(s => s.id != req.params.id); //menghapus data dengan id yang kamu set di url misal localhost:3000/api/soal/2, nanti 2 yang ke hapus
    res.json({
        message: `soal ${req.params.id} di hapus`,
        data: soal
    });
});

app.put('/api/soal/:id', (req, res) => {
    const index = soal.findIndex(s => s.id == req.params.id); //mencari posisi dari array
    soal[index].soal = "9+9 = ?";
    res.json({message: `soal ${req.params.id} di ubah`, data: soal
    });
});

app.listen(3000, () =>{
    console.log("Server berjalan di port 3000");
});