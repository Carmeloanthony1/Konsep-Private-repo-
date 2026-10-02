function pesankopi(namakopi){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(namakopi === "Americano" || namakopi === "Espresso"){
                resolve({ID: 101, Jeniskopi : namakopi, harga: 25000});
            } else {
                reject(`Kopi tidak ada di menu`);
            }
        }, 2000);
    });
}

function bayarkopi(datakopi, uangpembeli){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(uangpembeli >= datakopi.harga){
                resolve({Status: "Lunas", kembalian: uangpembeli - datakopi.harga})
            } else {
                reject(`Uang pembeli kurang`);
            }
        }, 2000);
    }); 
}

async function orderkopi(namapesanan, biayabayar){
    console.log(`Memesan kopi ${namapesanan}`);
    try {
        const order = await pesankopi(namapesanan);
        console.log(`Order berhasil, ID: ${order.ID} perlu di bayar ${order.harga}`);

        const pembayaran = await bayarkopi(order, biayabayar);
        console.log(`Pembayaran berhasil, kembalian yang di berikan adalah ${pembayaran.kembalian}`);
    } catch(error){
        console.log("Terdapat error : " +  error);
    }
}

orderkopi("Espresso", 300000);