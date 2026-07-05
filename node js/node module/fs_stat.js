const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'ilovekamenrider.txt');
const info = fs.statSync(filepath);
if (info.isFile()) {
    console.log(`besar file adalah ${info.size} byte`);
    console.log(`file terakhir di ubah pada ${info.mtime}`);
} else {
    console.log(`file tidak ada`);
}

