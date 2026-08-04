const express = require('express');
const app = express();

app.use(express.json());

const verifytoken = (req, res, next) => {
    req.user = {
        id: "user1",
        password: "password1",
        role: "MANAGER"
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

app.post('/api/edit', verifytoken, (req, res) => {
    res.json({
        message: `Ini route user, siapapun bisa pake asal login`,
        role: req.user.role
    });
});

app.delete('/api/delete', verifytoken, authorize("ADMIN"), (req, res) => {
    res.json({
        message: `Ini adalah rout private, hanya admin yang bisa masuk ke sini`,
        role: req.user.role
    });
});

app.get('/api/reports', verifytoken, authorize("ADMIN", "MANAGER"), (req, res) => {
    res.json({
        message: `Ini adalah route private, hanya admin dan manager yang bisa masuk ke sini`,
        role: req.user.role
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server connect ke port ${port}`);
});