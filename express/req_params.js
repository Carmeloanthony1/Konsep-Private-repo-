const express = require('express');
const app = express();

const menukopi = [
    { id : 1, menu: "Americano", kategori: "Panas" },
    { id : 2, menu: "Espresso", kategori: "Dingin" }, 
    { id : 3, menu: "Kapal api", kategori: "Panas" }
];

app.get('/api/menu/:id', (req, res) => {
    const idmenu = Number(req.params.id);
    const hasil = menukopi.find(item => item.id === idmenu);

    if(!hasil){
        return res.status(404).json({ error: "Menu tidak di temukan"});
    }
    res.json(`Menu dengan kopi ${hasil.menu} ditemukan`);
});

app.listen(3000);