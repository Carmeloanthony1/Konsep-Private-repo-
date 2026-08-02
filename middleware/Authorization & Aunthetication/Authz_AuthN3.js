const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
app.use(express.json());

const datauser = [
    { id: 1, username: "user1", password: "password1", role: "admin"},
];

const AccessToken = "Access_secret_key";
const RefreshToken = "Refresh_secret_key";

let listRefreshToken = []; //biar nanti bisa nyimpan refreshTOkennya 

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = datauser.find(user => user.username === username && user.password === password);
    if(!user){
        return res.status(401).json({
            error: "Username atau password salah"
        });
    }

    const userPayload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    const NewAccessToken = jwt.sign(userPayload, AccessToken, { expiresIn: '15s' });
    const NewRefreshToken = jwt.sign(userPayload, RefreshToken, { expriresIn: '7d' });

    listRefreshToken.push(NewRefreshToken);
    return res.status(200).json({
        message: "Login berhasil",
        accessToken: NewAccessToken,
        refreshToken: NewRefreshToken
    });
});