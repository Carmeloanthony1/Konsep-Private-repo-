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