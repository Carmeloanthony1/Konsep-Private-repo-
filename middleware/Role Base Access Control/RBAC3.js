const express = require('express');
const app = express();
const JWT = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const datauser = [
    {id: 1, username : "user1", password: "password1", role: "MEMBER"},
    {id: 2, username : "user2", password: "password2", role: "MANAGER"},
    {id: 3, username : "user3", password: "password3", role: "ADMIN"},
];

const access_secret = "secret";
const refresh_secret = "secret";

let save_refreshtoken = [];

const verifytoken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(404).json({
            error: "Silahkan login"
        })
    }
}