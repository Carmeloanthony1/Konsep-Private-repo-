const express = require('express');
const app = express();

const daftarMahasiswa = [
    { id: 1, nama: "Rusdi", jurusan: "Informatika", status: "aktif" },
    { id: 2, nama: "Budi", jurusan: "Informatika", status: "cuti" },
    { id: 3, nama: "Siti", jurusan: "Sistem Informasi", status: "aktif" },
    { id: 4, nama: "Andi", jurusan: "Informatika", status: "aktif" },
    { id: 5, nama: "Dewi", jurusan: "Sistem Informasi", status: "lulus" }
];

app.get('/api/mahasiswa/:jurusan', (req, res) => {
    const jurusan = req.params.jurusan;
    const status = req.query.status;

    let hasilfilter = daftarMahasiswa.filter(item => item.jurusan === jurusan);
    if(status){
        hasilfilter = hasilfilter.filter(item => item.status === status);
    }

    if(hasilfilter.length === 0){
        return res.status(404).json({
            error: `Mahasiswa yang di cari tidak ada`
        });
    } 
    return res.status(200).json({
        message: 'Mahasiswa yang di cari ada',
        total: hasilfilter.length,
        hasil: hasilfilter
    });
});

app.listen(3000, () => {
    console.log("Server connect ke port 3000");
});