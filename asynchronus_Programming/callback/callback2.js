function hitungdiskon (totalbelanja, callback) {
    console.log(`Sedang menghitung diskon`);
    setTimeout(() => {
        const diskon = totalbelanja * 0.1;
        const totalharga = totalbelanja - diskon;

        callback(totalharga);
    }, 3000);
}

function tampilkanharga(totalbayar){
    console.log(`Total yang harus di bayar adalah ${totalbayar}`);
}   

hitungdiskon(1000, tampilkanharga);

function isikelas(jumlahMAHASISWA, callback){
    const status = "Kelas sudah penuh!";
    console.log(`Memeriksa jumlah mahasiswa di dalam 1 kelas`);
    setTimeout(() => {
    if (jumlahMAHASISWA > 30 ){
        const status = "Kelas sudah penuh!";
    } else {
        const status = "Kelas masih bisa di isi";
    }
    callback(status);
    }, 1000);
}

function tampilkanstatus(pesanstatus){
    console.log(`Saat ini ${pesanstatus}`);
}

isikelas(90, tampilkanstatus);

