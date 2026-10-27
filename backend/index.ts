import express, { request, response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let tugas = [
    {id:1, judul:"ngoding sampai berak berak", status: "belum"},
    {id:2, judul:"ngoding sampai tidur", status: "belum"}
];

app.get('/api/tugas', (request, response) => {
    response.json({
        message: "Berhasil gei",
        data: tugas
    });
}); 

app.post('/api/tugas', (request, response) => {
    const { judul } = request.body;

    const tugas_baru = {
        id: tugas.length + 1,
        judul: judul,
        status: "belum selesai"
    };

    tugas.push(tugas_baru);

    response.status(201).json({
        message: "Data sudah masuk",
        data: tugas_baru
    });
    
});
app.listen(port, () => {
    console.log("Server udah nyala mas");
});