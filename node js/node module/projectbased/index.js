const fs = require('fs');
const path = require('path');

console.log("mulai...");
const folderpath = fs.mkdir(__dirname, 'logs');
const filepath = path.join(folderpath, "activity.log");

fs.writeFile(filepath, "[INFO] APLIKASI DIMULAI");
fs.appendFile(filepath, "[INFO] user login : Joccelyn");

const isi = fs.readFile(filepath, 'utf-8');
console.log(isi);

console.log("Selesai membaca log!")

