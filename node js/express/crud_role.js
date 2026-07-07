const express = require('express');
const app = express();

app.use(express.json());

let users = [
    { id: 1, name : 'Joshua', role : 'student'},
    { id: 2, name : 'John', role : 'teacher'},
    { id: 3, name : 'Mary', role : 'student'},
    { id: 4, name : 'Mike', role : 'teacher'},
]

app.get('/api/users', (req, res) => {
    res.json({message: 'berhasil', data: users});
});

app.post('/api/users', (req, res) => {
    const userbaru = {id: users.length + 1, name: req.body.name, role: req.body.role};
    users.push(userbaru);
    res.json({message: 'Berhasil', data: users});
});

app.put('/api/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    users[index].name = req.body.name;
    users[index].role = req.body.role;
    res.json({message: 'berhasil', data: users});
});

app.delete('/api/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.json({message: 'berhasil', data: users});
});

app.listen(3000, () => {
    console.log("Server jalan di port 3000");
});