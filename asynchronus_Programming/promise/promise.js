/*const inputnilai = (nama, nilai) => {
    return new Promise((resolve, reject) => {
        console.log(`Sedang memproses nilai ${nama}`);
        setTimeout(() => {
            if(nilai > 100){
                resolve({status: 'Selamat anda lulus', nama: nama});
            }
            else{
                reject({status: 'Maaf anda tidak lulus', nama: nama});
            } 
        }, 3000);
    });
}

inputnilai("bebek", 90)
    .then((status_sukses) => {
        console.log(`${status_sukses.nama}: ${status_sukses.status}`);
    })
    .catch((status_gagal) => {
        console.log(`${status_gagal.nama}: ${status_gagal.status}`);
    });
*/

/*const kirimpaket = (namabarang, jarak) => {
    return new Promise((resolve, reject) => {
        console.log(`Sedang mengirim paket ${namabarang} dengan jarak ${jarak}}`);
        setTimeout(() => {
            if(jarak < 100){
                resolve({status: 'Paket berhasil dikirim', nama: namabarang});
            }
            else{
                reject({status: 'Paket gagal dikirim', nama: namabarang});
            }
        }, 3000);
    });
};

kirimpaket("sepatu", 90)
    .then((status_sukses) => {
        console.log(`${status_sukses.nama}: ${status_sukses.status}`);
    })
    .catch((status_gagal) => {
        console.log(`${status_gagal.nama} : ${status_gagal.status}`);
    })
*/

const gacha =(ticket, namapemain) => {
    return new Promise((resolve, reject) => {
        console.log(`Sedang melakukan gacha...`);
        setTimeout(() => {
            if(ticket > 60){
                resolve({status: 'Dapat jackpot', nama: namapemain});
            }
            else {
                reject({status: 'Gagal dapat jackpot', nama: namapemain});
            }
        }, 3000);
    });
}

gacha(100, "Rizki")
    .then((status_sukses) => {
        console.log(`${status_sukses.nama} ${status_sukses.status}`)
    })
    .catch((status_gagal) => {
        console.log(`${status_gagal.nama} ${status_gagal.status}`);
    })