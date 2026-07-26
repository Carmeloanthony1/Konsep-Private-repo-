function daftarkanAKUN(email){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(email.includes("@")){
                resolve({email: email, userID: 109});
            } else {
                reject(`Email tidak valid`);
            }
        }, 1000);
    }); 
}

function verifikasiOTP(datauser, kodeOTP){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(kodeOTP === 1234){
                resolve({email: datauser.email, userID: datauser.userID, Status: "Verified"});
            } else {
                reject(`Kode OTP salah, verifikasi gagal`);
            }
        }, 2000);
    });
}

function generatetoken(dataverifikasi){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("TOKEN_SECRET_123 untuk user" + dataverifikasi.email);
        }, 2000);
    });
}

daftarkanAKUN("Jamal@gmail.com")
    .then((datauser) => {
        console.log(`Segera mendaftarkan akun untuk ${datauser.email}`);
        return verifikasiOTP(datauser, 1234);
    })
    .then((dataverifikasi) => {
        console.log(`Email sudah di verifikasi, akun ${dataverifikasi.email} sudah verified`);
        return generatetoken(dataverifikasi);
    })
    .then((status) => {
        console.log(status);
        console.log(`Selamat akun anda sudah 100% terdaftar`);
    })
    .catch((err) => {
        console.log(`Terdapat error` + err);
    })