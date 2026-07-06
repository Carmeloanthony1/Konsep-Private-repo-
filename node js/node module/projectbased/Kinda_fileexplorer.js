const fs = require('fs').promises;
const path = require('path');
async function main(){
    console.log(`ISI FOLDER : ${__dirname}`);
    console.log('--------------------------------------------------')
    const folderpath = path.join(__dirname);
    const files = await fs.readdir(folderpath);
    for(const item of files){
        const itempath = path.join(folderpath, item);
        const stats = await fs.stat(itempath);
        const tipe = stats.isFile() ? 'FILE' : 'FOLDER';
        const tanggal = stats.birthtime.toLocaleDateString('id-ID');
        console.log(`${tipe}`, `${item.padEnd(20)}`, `${tanggal.padEnd(20)}`);
    }
}

main();