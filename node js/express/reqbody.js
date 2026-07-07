const express = require('express');
const app = express();

let soal = [
    { id: 1, soal: '1+1 = ?'},
    { id: 2, soal: '2+2 = ?'},
    { id: 3, soal: '3+3 = ?'}
];

app.use(express.json()); //biar di proses req.body nya (middleware)

app.post('/api/soal', (req, res) =>{
    const soalbaru = {id: soal.length + 1, soal: req.body.soal};
    soal.push(soalbaru);
    res.json({message: "berhasil", data: soal});
});

app.put('/api/soal/:id', (req, res) => {
    const index = soal.findIndex(s => s.id == req.params.id);
    soal[index].soal = req.body.soal;
    res.json({message: `soal: ${req.params.id} di update`, data: soal});
});
app.listen(3000, () => {
    console.log("Server berjalan di port 3000");
})