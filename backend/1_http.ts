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

app.listen(port, () => {
    console.log("Server udah nyala mas");
});