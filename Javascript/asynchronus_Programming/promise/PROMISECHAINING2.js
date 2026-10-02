function cekSTOK(namabarang){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(namabarang === "Laptop" || namabarang === "laptop"){
                resolve({ Nama: "Laptop", Harga: 3000000, Stok: 9});
            } else {
                reject(`Barang ${namabarang} tidak di temukan`);
            }
        }, 2000);
    });
}

function potongstok(databarang){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const stokbaru = databarang.Stok - 1;

            resolve({Nama: "Laptop", Harga: 3000000, Stok: stokbaru});
        }, 1000);
    });
}

function prosesbayar(stokbaru, saldo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(saldo >= stokbaru.Harga){
                resolve(`Pembayaran untuk ${stokbaru.Nama} sudah berhasil, total harga yang di bayar adalah ${stokbaru.Harga}, sisa stok di gudang adalah ${stokbaru.Stok}`);
            } else {
                reject(`Pembayaran gagal, saldo kurang untuk membeli barang ${stokbaru.Nama}`);
            }
        }, 1500);
    });
}   

cekSTOK("Laptop")
    .then((databarang) => {
        console.log(`Stok kini sisa ${databarang.Stok}`);
        return potongstok(databarang);
    })
    .then((stokbaru) => {
        console.log(`Stok berhasil di potong, sekarang hanya sisa ${stokbaru.Stok}`);
        return prosesbayar(stokbaru, 60000000);
    })
    .then((hasilbayar) => {
        console.log(hasilbayar);
    })
    .catch((err) => {
        console.log("Terdapat error :", err);
    });