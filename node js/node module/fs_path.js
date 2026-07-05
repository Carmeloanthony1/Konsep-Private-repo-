//cara manggil
const fs = require('fs');
const path = require('path');

//nentuin path file di buat, path.join di pake buat hadepin masalah pperbedaan / dan \ di linux dan windows
const file_path = path.join(__dirname, 'ilovekamenrider.txt');
console.log(`Saat ini anda berada di folder, ${__dirname}`);
const isifile = "i love joccelyn chang";

//cara tulis file
fs.writeFileSync(file_path, isifile, 'utf-8');
//pakai utf-8 kalau untuk yang ada string, kalau untuk image jangan di pake nanti rusak

fs.appendFileSync(file_path, '\nI lope joccelyn chang', 'utf-8');
//untuk append pake appendfilesync, kalau misal mau async, pake appendfile biasa aja

const isi = fs.readFileSync(file_path, 'utf-8');
console.log(`File berhasil di buat dan di tulis`);
console.log(`isi file : ${isi}`);
//note, saat file di ubah isi filenya, itu sama aja nge bikin file nya overwrite, jadi filenya tetap sama