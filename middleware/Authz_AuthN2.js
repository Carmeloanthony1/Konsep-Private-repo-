const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const secretkey = "your_secret_key"; 
const datauser = [
    { id: 1, username: "user1", password: "password1", role: "admin" },
    { id: 2, username: "user2", password: "password2", role: "user" }
];

const artikel = [
    { id: 1, judul: "Artikel 1", penulis: "Penulis 1" },
    { id: 2, judul: "Artikel 2", penulis: "Penulis 2" },
    { id: 3, judul: "Artikel 3", penulis: "Penulis 3" }
];

const autentikasi_user = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if(!authHeader){
        return res.status(401).json({
            error: "Token tidak di temukan, silahkan login"
        });
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            error: "Format token tidak valid"
        });
    }

    jwt.verify(token, secretkey,(err, dataDecoded) => {
        if(err){
            return res.status(403).json({
                error: "Token sudah kadarluasa"
            });
        }
        req.user = dataDecoded;
        next();
    });
};

const authorization = (req, res, next) => {
    if(req.user.role === "admin"){
        next();
    } else {
        return res.status(403).json({
            error: "User tidak memiliki akses untuk akses ke page ini"
        });
    }
};

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = datauser.find(user => user.username === username && user.password === password);
    if(!user){
        return res.status(401).json({
            error: "Username atau password salah"
        });
    } 
    const dataJWT = { 
        userId: user.id,
        username: user.username,
        role: user.role
    };

    const tokenbaru = jwt.sign(dataJWT, secretkey, { expiresIn: '2h'});
    return res.status(200).json({
        message: "Login berhasil",
        token: tokenbaru
    });
});