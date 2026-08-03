const express = require('express');
const app = express();
const JWT = require('jsonwebtoken');
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const Access_Token = "ACCESSTOKEN";
const Refresh_Token = "REFRESHTOKEN";

let save_refreshtoken = [];

const datauser = [
    { id: 1, nama: "user1", password: "password1"},
    { id: 2, nama: "user2", password: "password2"}
];

app.post('/api/login', (req, res) => {
    const { nama, password } = req.body;
    if(!nama || !password){
        return res.status(401).json({
            error: "Silahkan isi seluruh bagan yang ada"
        });
    }
    const user = datauser.find(u => u.nama === nama && u.password === password);

    const payload = {
        userId: user.id,
        nama: user.nama,
    }

    const accesstoken = JWT.sign(payload, Access_Token, { expiresIn : '15s' });
    const refreshtoken = JWT.sign(payload, Refresh_Token, { expiresIn : '7d' });

    save_refreshtoken.push(refreshtoken);

    res.cookie('refreshtoken_cookie', refreshtoken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: `Selamat datang, ${payload.nama}`,
        accesstoken:accesstoken
    });
});

app.post('/api/refresh-token', (req, res) => {
    const tokencookie = req.cookies.refreshtoken_cookie;
    if(!tokencookie){
        return res.status(404).json({
            error: "Cookie tidak di temukan"
        });
    }
    if(!save_refreshtoken.includes(tokencookie)){
        return res.status(404).json({
            error: "Token sudah tidak valid, tidak terterah di database"
        });
    }
    JWT.verify(tokencookie, Refresh_Token, (err, decoded) => {
        if(err){
            return res.status(403).json({
                error: "Refresh token sudah kadarluasa, silahkan login ulang"
            });
        }
        const new_ACCESSTOKEN = JWT.sign(
            { userId: decoded.userId, nama: decoded.nama }, 
            Access_Token, { expiresIn : "15s"}
        );

        return res.status(200).json({
            message: "Berhasil merefresh access token",
            accesstoken: new_ACCESSTOKEN
        });
    });
});

app.delete('/api/logout', (req, res) => {
    const tokencookie = req.cookies.refreshtoken_cookie;

    save_refreshtoken = save_refreshtoken.filter(token => token !== tokencookie);
    res.clearCookie('refreshtoken_cookie');

    return res.json({
        message: "Berhasil logout"
    });
});

app.listen(3000, () => {
    console.log("Server menyala di port 3000");
});