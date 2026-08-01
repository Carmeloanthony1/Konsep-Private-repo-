const express = require('express');
const jwt = require('jsonwebtoken'); //digunakan untuk generate JWT token nantinya

const app = express();
app.use(express.json());

const secretkey = "your_secret_key"; // Ganti dengan secret key yang aman

const dataUser = [
    { id: 1, username: "user1", password: "password1", role: "admin" },
    { id: 2, username: "user2", password: "password2", role: "user" }
];

const product_list = [
    { id: 1, nama: "Product 1", harga: 100 },
    { id: 2, nama: "Product 2", harga: 200 },
    { id: 3, nama: "Product 3", harga: 300 }
];

const autentikasi_user = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({ error: "Token tidak di temnukan" });
    }

    const token = authHeader.split('')[1]; //memisahkan bearer dengan token 
    if(!token){
        return res.status(401).json({ error: "Token tidak di temukan"});
    }

    jwt.verify(token, secretkey, (err, decodedData) => {
        if(err){
            return res.status(403).json({ error: "Token tidak valid"}); //tokennya berubah atau tidak valid
        };
        res.user = decodedData;
        next();
    });
}

