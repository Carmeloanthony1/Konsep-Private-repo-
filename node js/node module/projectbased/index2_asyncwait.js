const fs = require('fs').promises; //kalau pake async wait, harus pake promises
const path = require('path');

const folderpath = path.join(__dirname, 'logs');
const filepath = path.join(folderpath, "activity.log");

async function log(pesan){
    const timestamp = new Date().toLocaleString('id-ID');
    await fs.appendFile(filepath, `${timestamp} : ${pesan}\n`, 'utf-8');
}

async function main(){
    await fs.mkdir(folderpath, {recursive : true});
    await fs.writeFile(filepath, ''); //reset file

    await log(`[INFO] APLIKASI DIMULAI`);
    await log(`[WARNING] DISK HAMPIR PENUH`);
    await log(`[ERROR] KONEKSI DATABASE GAGAL`);
}

main();