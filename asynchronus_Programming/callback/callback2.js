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