const namabarang = {
    barang_1 : 100,
    barang_2 : 200,
    barang_3 : 300,
}

const {barang_1, barang_2, barang_3} = namabarang;

const cekgudang = (namabarang, callback) => {
    if(namabarang.barang_1 > 0 && namabarang.barang_2 > 0 && namabarang.barang_3 > 0) {
        const status = "Barang ready semua";
        callback(status);
    }
}