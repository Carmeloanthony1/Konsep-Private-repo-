function cekbarang(namabarang){
    return new Promise((resolve, reject) => {
        console.log(`Memeriksa stok untuk barang ${namabarang}`);

        setTimeout(() => {
            const stokmasihada = true;
            if(stokmasihada){
                resolve(`Stok untuk barang ${namabarang} masih ada`);
            } else {
                reject(`Stok untuk barang ${namabarang} sudah tidak ada`);
            }
        }, 2000);
    });
}

cekbarang("ES TEH PANAS")
    .then((hasilsukes) => {
        console.log(hasilsukes);
    })
    .catch((hasiltidaksukses) => {
        console.log(hasiltidaksukses);
    });
