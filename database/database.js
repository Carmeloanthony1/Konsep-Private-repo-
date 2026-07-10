const mysql = require('mysql2');
const db = mysql.createConnection({ //koneksi
    host: 'localhost',
    user: 'root',
    password:'',
    database:'EXAMPLE'
});

db.connect((err) => {
    if(err){
        console.log("Database tidak berhasil connect :", err.message);
        return
    } else {
        console.log("Database berhasil Connect");
    }
});

module.exports = db; //biar bisa di pake sama file lain 