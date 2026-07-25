function pemesanan(namaMenu){
    return new Promise((resolve, reject) => {
        console.log(`Pesanan dengna nama ${namaMenu} sedang di siapkan`);
        
        setTimeout(() => {
            if(namaMenu){
                resolve({status: "SUKSES", menu: namaMenu, harga: 30000});
            } else {
                reject("Menu tidak ada");
            }
        }, 1500);
    });

}

function membayar(datapesanan){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Pembayaran untuk ${datapesanan.menu} sebesar ${datapesanan.harga} berhasil di bayar`);
        }, 1000);
    });
}

pemesanan("Es teh panas")
    .then((datapesanan) => {
        console.log(`Pesanan dengan menu ${datapesanan.menu} seharga ${datapesanan.menu}`);
        return membayar(datapesanan);
    })
    .then((hasilbayar) => {
        console.log(hasilbayar);
    })
    .catch((err) => {
        console.log(`Terdapat sebuah error : ${err}`);
    })