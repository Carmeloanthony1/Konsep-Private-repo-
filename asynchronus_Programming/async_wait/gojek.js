function caridriver(kordinatuser){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(kordinatuser.lat && kordinatuser.long){
                resolve({ DrivedID: "DRV-007", namaDriver: "Muhammad", jarak: 1.5, tarif: 25000});
            } else {
                reject("GPS tidak terlacak");
            }
        }, 2000);
    });
}

function prosespembayaran(datadriver, saldouser){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(saldouser >= datadriver.tarif){
                resolve({Status: "Lunas", sisasaldo: saldouser - datadriver.tarif});
            } else {
                reject("Tidak ada uang yang cukup");
            }
        });
    });
}

async function ordergojek(lokasi, saldo){
    console.log("Mencari driver...");
    try {
        const driver = await caridriver(lokasi);
        console.log(`Driver sudah di temukan dengan nama ${driver.namaDriver}`);

        const pembayaran = await prosespembayaran(driver, saldo);
        console.log(`ID: ${driver.DrivedID}, total biaya yang harus di bayar adalah ${driver.tarif}`);
        console.log(`Pembayaran berhasil, sisa saldo adalah ${pembayaran.sisasaldo}`);
    } catch (error){
        console.error("Terdapat sebuah error :" + error);
    }
}

const lokasiUser = { lat: -6.200000, long: 106.816666 };
ordergojek(lokasiUser, 50000);