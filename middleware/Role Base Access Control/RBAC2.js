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

app.post('/api/login', (req, res) => {
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

app.post('/api/refresh-token', verifytoken, (req, res) => {
    const tokencookie = req.cookie.refreshtoken_cookie;
    if(!tokencookie){
        return res.status(403).json({
            error: "Tidak ada token, silahkan login"
        });
    }

    if(!save_refreshsecret.includes(tokencookie)){
        return res.status(403).json({
            error: "Refresh token sudah expired, silahkan login lagi"
        });
    }

    JWT.verify(tokencookie, refresh_secret, (err, decoded) => {
        if(err){
            return res.status(401).json({
                error: "Token tidak cocok/kadaluasa, silahkan login"
            });
        }

        const NEW_accesstoken = JWT.sign(
            {user_ID: decoded.user_ID, user_USERNAME: decoded.user_USERNAME, user_ROLE: decoded.user_ROLE}, 
            access_token, { expiresIn : '15s' }
        );
        
        return res.status(200).json({
            message: "Token sudah di refresh",
            access_token: NEW_accesstoken
        });
    });
});

app.post('/api/convert/basic', verifytoken, allowedRoles("FREE_USER", "PREMIUM_USER", "ADMIN"), (req, res) => {
    return res.status(200).json({
        message: "Page ini boleh di buka oleh siapa aja"
    });
});

app.post('/api/convert/pro', verifytoken, allowedRoles("PREMIUM_USER", "ADMIN"), (req, res) => {
    return res.status(200).json({
        message: "Page ini boleh di buka oleh premium user dan admin"
    });
});

app.delete('/api/convert/delete', verifytoken, allowedRoles("ADMIN"), (req, res) => {
    return res.status(200).json({
        message: "Page ini boleh di buka oleh admin"
    });
});

app.post('/api/logout', verifytoken, allowedRoles("FREE_USER", "PREMIUM_USER", "ADMIN"), (req, res) => {
    
});