const express = require('express');
const app = express();
app.use(express.json());


let pelajaran = [
    {id: 1, pelajaran: 'AI'},
    {id: 2, pelajaran: 'Web'},
    {id: 3, pelajaran: 'Mobile'},
    {id: 4, pelajaran: 'Data Science'},
];

app.get('/api/pelajaran', (req, res) => {
    res.status(200).json({message: 'berhasil', data: pelajaran});
});

app.post('/api/pelajaran', (req, res) => {
    if(!req.body.pelajaran){
        res.status(400).json({message: "Pelajaran wajib di isi"});
    }
    const pelajaranbaru = {id: pelajaran.length + 1, pelajaran: req.body.pelajaran};
    pelajaran.push(pelajaranbaru);
    res.status(201).json({message: `Berhasil menambahkan ${req.body.pelajaran}`, data: pelajaran});
});

app.put('/api/pelajaran/:id', (req, res) => {
    const index = pelajaran.findIndex(p => p.id == req.params.id);
    if(index == -1){
        res.status(404).json({message: "pelajaran tidak di temukan"});
    }
    pelajaran[index].pelajaran = req.body.pelajaran;
    res.status(200).json({message: `Berhasil mengubah pelajaran ke-${index}`, data: pelajaran});
});

app.delete('/api/pelajaran/:id', (req, res) => {
    const index = pelajaran.findIndex(p => p.id == req.params.id);
    if(index == -1){
        res.status(404).json({message : "tidak menemukan pelajaran"});
    }
    pelajaran = pelajaran.filter(p => p.id != req.params.id);
    res.status(200).json({message: 'Berhasil menghapus pelajaran', data: pelajaran});
});

app.listen(3000, () => {
    console.log("Server sudah nyala di port 3000");
});