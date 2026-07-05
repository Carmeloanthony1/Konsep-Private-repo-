const fs = require('fs');
const path = require('path');
const timestamp = new Date().toLocaleString('id-ID');
folderpath = path.join(__dirname, 'logs');
fs.mkdir(folderpath, {recursive : true}, (err) => {
    if(err){
        return console.log("Gagal buat folder");
    }
    const filepath = path.join(folderpath, "activity.log");
    fs.writeFile(filepath, `${timestamp} : [INFO] APLIKASI DIMULAI`, (err) => {
        if(err){
            return console.log("Gagal menulis di file");
        }
        console.log(`${timestamp} : [INFO] APLIKASI DIMULAI`);
        fs.appendFile(filepath, `\n${timestamp} : [WARNING] DISK HAMPIR PENUH`, (err) => {
            if(err){
                return console.log("Gagal append file");
            }
            console.log(`${timestamp} : [WARNING] DISK HAMPIR PENUH`);
            fs.appendFile(filepath, `\n${timestamp} : [ERROR] KONEKSI DATABASE GAGAL`, (err) => {
                if(err){
                    return console.log("Gagal append file");
                }
                console.log(`${timestamp} : [ERROR] KONEKSI DATABASE GAGAL`);

            });
        });
    });
});