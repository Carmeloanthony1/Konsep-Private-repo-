const express = require('express');
const app = express();
const JWT = require('jsonwebtoken');
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const datauser = [
    {id: 1, nama: "user1", password: "password1"}
];

let save_refreshtoken = [];

const access_secret = "accesstoken";
const refresh_secret = "refreshtoken";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1]; //dipotong jadi 2, kemudian di ambil tokennya

    if(!token){
        return res.status(404).json({
            error: "Akses di tolak, access token tidak ada"
        });
    }

    JWT.verify(token, access_secret, (err, user) => {
        if(err){
            return res.status(402).json({
                error: "Access token tidak valid, segera refresh token"
            });
        }
        req.user = user;
        next();
    });
}

app.post('/api/login', (req, res) => {
   const { nama, password } = req.body;
   if(!nama || !password){
    return res.status(402).json({
        error: "Silahkan masukan seluruh bagian"
    });
   }

   const user = datauser.find(u => u.name === name && u.password === password);
   
   if(!user){
    return res.status(404).json({
        error: "User tidak di temukan"
    });
   }

   const payload = {
    userId: user.id,
    name: user.name
   }

   const accesstoken = JWT.sign(payload, access_secret, { expiresIn : '15s' });
   const refreshtoken = JWT.sign(payload, refresh_secret, { expiresIn : '7d' });

   save_refreshtoken.push(refresh_token);

   res.cookie('REFRESHTOKEN', refresh_token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
   });

   res.status(200).json({
    message: "Berhasil login",
    accesstoken: accesstoken
   });
}); 

app.get('/api/profile', authenticateToken, (req, res) => {
    return res.status(200).json({
        message: "Berhasil masuk ke page kredensial",
        datauser: req.user
    });
});

app.post('/api/refresh-token', (req, res) => {
    const tokencookie = req.cookies.REFRESHTOKEN;
    if(!tokencookie){
        return res.status(404).json({
            error: "refresh token tidak di temukan, silahkan login"
        }); 
    }

    if(save_refreshtoken.includes(tokencookie)){
        return res.status(404).json({
            error: "Token sudah kadarluasa"
        });
    }

    JWT.verify(tokencookie, refresh_secret, (err, decoded) => {
        if(err){
            return res.status(402).json({
                error: "Refresh token sudah kadarluasa"
            });
        }

        const new_accesstoken = JWT.sign(
            { userId: decoded.userId, nama: decoded.nama },
            access_secret, { expiresIn: '15s' }
        )

        return res.status(200).json({
            message: "Berhasil refresh access token",
            accesstoken: new_accesstoken
        });
    });
}); 

app.delete('/api/logout', (req, res) => {
    const tokencookie = req.cookies.REFRESHTOKEN;

    save_refreshtoken = save_refreshtoken.filter(token => token.id !== tokencookie); //seengaja di filter, biar ga muncul token nya
    res.clearCookie('save_refreshtoken'); //terus jadinya di apus token yang ga muncul dan sisa yang muncul aja 

    return res.status(200).json({
        message: "Berhasil logout"
    }); 
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server connect di port ${port}`);
});