const fs = require('fs');
const path = require('path');

console.log("mulai...");
const folderpath = path.join(__dirname, 'logs');
fs.mkdir(folderpath, {recursive: true}, (err) => {
    if(err) {
        return console.log("Gagal buat folder");
    }
    const filepath = path.join(folderpath, "activity.log");

    fs.writeFile(filepath, "[INFO] APLIKASI DIMULAI", (err) => {
        if(err) {
            return console.log("Gagal tulis file");
        }
        fs.appendFile(filepath, "\n[INFO] user login : Joccelyn", (err) => {
            if(err) {
                return console.log("Gagal append file");
            }
            fs.readFile(filepath, 'utf-8', (err, data) => {
                if(err){
                    return console.log("Gagal membaca file");
                }
                console.log(data);
                console.log("Selesai membaca log!");
            });
        });
    });
});


