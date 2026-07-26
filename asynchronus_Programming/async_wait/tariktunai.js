function tariktunai(jumlahtariktunai){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(jumlahtariktunai <= 1000000){ //jumlahtarik tunai <= 1000000, 10000 <= 1000000
                resolve({Status: "sukses", totaltunai: 1000000 - jumlahtariktunai}) //1000000 - 10000, dia kirim balik karena udah selesai
            } else {
                reject(`Duit nya ndak ada mas`);
            }
        }, 2000);
    });
}

async function statuspenarikan(nominal){
    console.log("Memproses penarikan sebesar " + nominal);

    try{
        const hasil = await tariktunai(nominal)  //10000 ini kemudian di kirim jadi jumlah tarik tunai
        //maka hasilnya adalah hasil.totaltunai 990000
        console.log(`Uang sebesar ${nominal} sudah di ambil, sisa uang mu saat ini adalah ${hasil.totaltunai}`);
    } catch(err) {
        console.log(`Transaksi gagal : ` + err);
    }
}

statuspenarikan(10000); //passing ke status penarikan 
