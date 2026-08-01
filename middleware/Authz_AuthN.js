const express = require('express');
const jwt = require('jsonwebtoken'); //digunakan untuk generate JWT token nantinya

const app = express();
app.use(express.json());

const secretkey = "your_secret_key"; // Ganti dengan secret key yang aman

const dataUser = [
    { id: 1, username: "user1", password: "password1", role: "admin" },
    { id: 2, username: "user2", password: "password2", role: "user" }
];

const product_list = [
    { id: 1, nama: "Product 1", harga: 100 },
    { id: 2, nama: "Product 2", harga: 200 },
    { id: 3, nama: "Product 3", harga: 300 }
];

const autentikasi_user = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({ error: "Token tidak di temnukan" });
    }

    const token = authHeader.split(' ')[1]; //memisahkan bearer dengan token 
    if(!token){
        return res.status(401).json({ error: "Token tidak di temukan"});
    }

    jwt.verify(token, secretkey, (err, decodedData) => { //secret key akan memecah token yang di kirimkan oleh user
        if(err){
            return res.status(403).json({ error: "Token tidak valid"}); //tokennya berubah atau tidak valid
        }; //semisal tokennya ga vallid, dia ga akan ke pecah
        req.user = decodedData; //decoded data itu berisi seluruh informasi user misalnya id, username, role
        next();
    });
}

const Authorization = (req, res, next) => {
    if(req.user.role === "admin"){
        next();
    } else {
        return res.status(403).json({
            error: "User tidak memiliki akses untuk mengakses page ini"
        });
    }
};

app.post('/api/login', (req, res) => {
    const { username, password } = req.body; 
    const user = dataUser.find(u => u.username === username && u.password === password);
    if(!user){
        return res.status(401).json({ error: "Username atau password salah"});
    }

    const dataJWT = {
        userID : user.id,
        username : user.username,
        role : user.role
    };

    const tokenbaru = jwt.sign(dataJWT, secretkey, { expiresIn: '1h' }); //token akan expired dalam 1 jam
    return res.status(200).json({
        message: "Login berhasil",
        token: tokenbaru
    });
});

app.get('/api/products', (req, res) => {
    return res.status(200).json({
        message:"Berhasil menampilkan product",
        data: product_list
    });
});

app.get('/api/profile', autentikasi_user, (req, res) => {
    return res.status(200).json({
        message: "Berhasil menampilkan profile user",
        data: req.user
    });
});

app.post('/api/products', autentikasi_user, Authorization, (req, res) => {
    const { nama, harga } = req.body;
    if(!nama || !harga){
        return res.status(400).json({
            error: "Silahkan mengisi seluruh bagan yang di perlukan"
        });
    }

    const produkbaru = {
        id: product_list.length + 1,
        nama: nama,
        harga: harga
    }

    product_list.push(produkbaru);
    return res.status(201).json({
        message: "Berhasil menambahkan produk",
        total: product_list.length,
        data: produkbaru
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

