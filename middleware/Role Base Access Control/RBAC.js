const express = require('express');
const app = express();

app.use(express.json());

const verifytoken = (req, res, next) => {
    req.user = {
        id: "user1",
        password: "password1",
        role: "USER"
    };
    next();
};

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role){
            return res.status(401).json({
                success: false,
                error: "Belum terautentikasi"
            });
        }
        
        const isAllowed = allowedRoles.includes(req.user.role);

        if(!allowedRoles){
            return res.status(403).json({
                success: false,
                error: "Role anda tidak memiliki izin untuk menggunakan fitur ini"
            });
        }
        next();
    };
};

app.get('/api/public', (req, res) => {
    res.json({
        message: "Ini route publik, siapapun bebas join"
    })
});     