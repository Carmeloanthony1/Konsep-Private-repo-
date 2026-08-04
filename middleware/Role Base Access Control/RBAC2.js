const express = require('express');
const app = express();
const JWT = require('jsonwebtoken');
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const datauser = [
    {id: 1, username : "user1", password: "password1", role: "FREE_USER"},
    {id: 2, username : "user2", password: "password2", role: "PREMIUM_USER"},
    {id: 3, username : "user3", password: "password3", role: "ADMIN"}
];

const refresh_secret = "refreshsecret";
const access_secret = "accesssecret";

let save_refreshsecret = [];

const verifytoken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({ error: "Tidak ada token, silahkan login"})
    }

    JWT.verify(token, access_secret, (err, decoded) => {
        if(err){
            return res.status(401).json({ error: "Token sudah expired" });
        }   
        
        req.user = decoded; //menyimpan seluruh data kayak id, nama, role 
        next();
    });
};

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role){
            return res.status(404).json({ error: "Data tidak di temukan/tidak lengkap"});
        }

        const isAllowed = allowedRoles.includes(req.user.role);
        if(!isAllowed){
            return res.status(403).json({
                error: "Tidak memiliki akses yang sesuai"
            });
        }
        next();
    };
};

app.login('/api/login', (req, res) => {
    const { username, password, role } = req.body;
    if(!username || !password || !role ){
        return res.status(403).json({ error: "Silahkan mengisi seluruh bagan yang diperlukan"});
    }

    const user = datauser.find(u => u.username === username && u.password === password);
    const payload = {
        user_ID : user.id,
        user_USERNAME : user.username,
        user_ROLE : user.role
    }

    const access_token = JWT.sign(payload, access_secret, { expiresIn : '15s' });
    const refresh_token = JWT.sign(payload, refresh_secret, { expiresIn : '7d' });

    save_refreshsecret.push(refreshtoken);

    res.cookie('refreshtoken_cookie', refresh_token, {
        httpOnly : true,
        sameSite : 'strict',
        maxAge : 7 * 60 * 60 * 24 * 1000
    });

    res.status(200).json({
        message: `Selamat datang ${payload.user_USERNAME}`
    });
}); 