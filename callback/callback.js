

/* const namabarang = {
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

cekgudang(namabarang, (status) => {
    console.log(status);
}) */
/*const proseslogin = (email, password, callback) => {
    console.log("Sedang proses login...");
    setTimeout(() => {
        if(password === "1234") callback("Login berhasil!");
        else callback("Login gagal");
    }, 5000)
};

proseslogin("melo@gmail.com", "1234", (status) => {
    console.log(status)}); */

/*const ambilartikel = (id, callback) => {
    console.log(`Sedang mengambil artikel (id ke-${id})`);
    setTimeout(() => {
        const dataartikel = {
            id : id,
            judul : "belajar berak di celana sebelum umur 20 tahun",
            viewer : 1000
        }
        callback(dataartikel);
    }, 3000);

}
ambilartikel(120291020, (dataartikel) => {
    console.log(dataartikel.judul)
})*/

const inputnilai = (nama, nilai, callback) => {
    console.log(`sedang memproses nilai ${nama}`);
    setTimeout(() => {
        if(nilai >70) callback("Selamat anda lulus", nama);
        else callback("Maaf anda tidak lulus", nama);
    }, 3000);
};

inputnilai("bebek", 90, (status, nama) => {
    console.log(`${nama}: ${status}`);
})  