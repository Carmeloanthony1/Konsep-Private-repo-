const express = require('express');
const app = express();

app.use(express.json());

const daftarTask = [
    { id: 1, judul: "Bikin Laporan Komvis", status: "proses" },
    { id: 2, judul: "Belajar Express POST & GET", status: "done" }
];

app.get('/api/task', (req, res) => {
    const status = req.query.status;
    let hasil = daftarTask;
    if(status){
        hasil = daftarTask.filter(item => item.status === status);
    }

    if(hasil.length === 0){
        return res.status(404).json({
            error: "Task tidak di temukan"
        });
    }

    return res.status(200).json({
        message: "Task yang di cari ada",
        total: hasil.length,
        data: hasil
    });
});

app.post('/api/task', (req, res) => {
    const { judul, status } = req.body;
    if(!judul || !status){
        return res.status(400).json({
            error: "Judul ataupun status perlu di isi"
        });
    }

    const taskbaru = {
        id: daftarTask.length + 1,
        judul: judul,
        status: status
    }

    daftarTask.push(taskbaru);

    return res.status(200).json({
        message: "Task sudah di tambahkan",
        total: daftarTask.length,
        data: taskbaru
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server sudah connect ke ${port}`);
});