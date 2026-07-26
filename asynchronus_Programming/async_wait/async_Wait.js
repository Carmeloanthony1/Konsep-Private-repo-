/*const ambilDataBackend = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(userId === 123) resolve({ nama: "Mas Rusdi", role: "Sepuh Admin" });
            else reject({ nama: "Asing", role: "Gak Dikenal" });
        }, 2000);
    });
};

const jalankanproses = async () => {
    try {
        console.log("Sedang mengambil data dari backend...");
        const hasil = await ambilDataBackend(140);
        console.log(`Nama: ${hasil.nama}, Role: ${hasil.role}`);
    } catch (error){
        console.log(error, `nama: ${error.nama}, Role : ${error.role} gagal diambil`)
    }
 };

 jalankanproses(); */

 /*
const verifikasi_topup = (statusbayar, totalkoin) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(statusbayar === "Sukses") resolve ({ status: "Topup berhasil", totalkoin: totalkoin});
            else reject({ status: "Topup gagal", totalkoin : 0});
        }, 3000);
    });
};

const topup = async () => {
    try {
        console.log("Sedang melakukan verifikasi topup...");
        const hasil = await verifikasi_topup("Sukses", 800);
        console.log(`status: ${hasil.status}, totalkoin: ${hasil.totalkoin}`);
    } catch (hasil_gagal) {
        console.log(`Status: ${hasil_gagal.status}, totalkoin: ${hasil_gagal.totalkoin}`);
    }
}
topup();
*/

const loginadmin = (email, password) => {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            if(email === "admin@gmail.com" && password === "1234"){
                resolve ({ status: "Login berhasil", role: "Admin"});
            }
            else reject({ status: "login gagal", role: "Unnessacary"});
        }, 3000);
    });
}

const jalankanlogin = async () => {
    try {
        console.log("Sedang melakukan login...");
        const hasil = await loginadmin("admin@gmail.com", "1234");
        console.log(`status: ${hasil.status}, role: ${hasil.role}`);
    } catch (hasil_gagal) {
        console.log(`status: ${hasil_gagal.status}, role: ${hasil_gagal.role}`);
    }
};

jalankanlogin();