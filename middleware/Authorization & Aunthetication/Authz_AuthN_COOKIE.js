const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cookieParset()); //biar nanti bisa pake req.cookies

const AccessToken = "Access_secret_key";
const RefreshToken = "Refresh_secret_key";

const datauser = [
    { id: 1, username: "user1", password: "password1", role: "admin" }, 
    { id: 2, username: "user2", password: "password2", role: "user" }
];

let listRefreshToken = [];
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = datauser.find(user => user.username === username && user.password === password);
    if(!user){
        return res.status(401).json({
            error: "Username atau password salah"
        }); 
    }

    const userPayload = {
        userId: user.id,
        username: user.username,
        role: user.role
    }

    const NEW_accesstoken = jwt.sign(userPayload, AccessToken, { expiresIn : '20s' });
    const NEW_refreshtoken = jwt.sign(userPayload, RefreshToken, { expiresIn : '7d'});
     
    listRefreshToken.push(NEW_refreshtoken);

    res.cookie('NEW_refreshtoken', NEW_refreshtoken, {
        httpOnly: true,
        secure: false, //kalau nanti https ganti jadi true
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 1000
    });

    return res.status(200).json({
        message: `Login berhasil, selamat datang ${user.username}`,
        AccessToken: NEW_accesstoken
    });
});

app.cost('/api/refresh-token', (req, res) => {
    const token = req.cookies.NEW_refreshtoken;
    if(!token){
        return res.status(401).json({
            error: "Cookie tidak ditemukan"
        });
    }

    if(!listRefreshToken){
        return res.status(403).json({
            error: "Token tidak valid"
        });
    }

    jwt.verify(token, RefreshToken, (err, decoded_Data) => {
        if(err){
            return res.status(403),json({
                error: "Refresh token sudah expired"
            });
        }

        const user = users.find(u => u.id === decoded_Data.userId);
        if(!user){
            return res.status(404).json({
                error: "User tidak di temukan"
            });
        }
        const NEW_ACCESSTOKEN = jwt.sign(
            { userId: user.id, username: user.username },
            AccessToken, { expiresIn : '20s'}
        );

        return res.status(200).json({
            message: "Token berhasil di perbaharui",
            AccessToken: NEW_ACCESSTOKEN
        });
    });
});