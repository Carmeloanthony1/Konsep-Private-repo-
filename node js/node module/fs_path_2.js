//cara manggil
const fs = require('fs');
const path = require('path');


const folder_path = path.join(__dirname, 'folder');

fs.mkdirSync(folder_path, {recursive: true});
console.log("folder berhasil di buat!");
//membuat sebuah folder dari folder path yang sudah di tentukan
//dirname itu ambil tepat di folder yang program ini tempati
//ada cara lain, kalau misalnya foldernya ternyata udah ada
const file_path = path.join(folder_path, "latihan.txt");

fs.writeFileSync(file_path, "i love berak", 'utf-8');
console.log("File sudah di tulis")