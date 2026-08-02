const express = require('express');
const app = express();
const JWT = require('jsonwebtoken');
const cookies = require('cookie-parser');

app.use(express.json());
app.use(cookies());

const datauser = [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" }
]

const access_token = "access_token_dummy";
const refreh_token = "refresh_token_dummy";

let Save_refreshtoken = [];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(401).json({
            error: "Silahkan isi seluruh bagan"
        });
    }
    const user = datauser.find(u => u.username === username && u.password === password);
    if(!user){
        return res.status(401).json({
            error: "Username atau password salah"
        });
    }

    const payload = {
        userID: user.id,
        username: user.username,
    };

    const newaccess_token = JWT.sign(payload, access_token, { expiredIn : '15s' });
    const newrefresh_token = JWT.sign(payload, refreh_token, { expiredIn : '7d' });

    Save_refreshtoken.push(newrefreh_token);

    res.cookie('refreshcookie', newrefresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 //7 hari
    });

    return res.status(200).json({
        message: `Login berhasil, selamat datang ${payload.username}`
    });
});

const port = 3000;
app.use(port, () => {
    console.log("Server terkoneksi di port 3000");
});