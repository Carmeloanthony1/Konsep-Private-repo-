const express = require('express');
const app = express();

app.use(express.json());

const verifytoken = (req, res, next) => { //dummy data dan token
    req.user = {
        id: "user1",
        password: "password1",
        role: "MANAGER"
    };
    next();
};

const authorize = (...allowedRoles) => { //fungsi yang bener main disini
    return (req, res, next) => {
        if(!req.user || !req.user.role){ //ini cuman checking doang, semisal user nya itu masih ada atau ga
            //sapa tau join tapi ternyata bukan user
            return res.status(401).json({
                success: false,
                error: "Belum terautentikasi"
            });
        }
        
        const isAllowed = allowedRoles.includes(req.user.role); //ini biar kasih tau nanti roles apa yang boleh

        if(!allowedRoles){
            return res.status(403).json({
                success: false,
                error: "Role anda tidak memiliki izin untuk menggunakan fitur ini" //kalau ga boleh di kick
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

app.delete('/api/delete', verifytoken, authorize("ADMIN"), (req, res) => { //cara masang nya tinggal kasih tau nama role nya 
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

