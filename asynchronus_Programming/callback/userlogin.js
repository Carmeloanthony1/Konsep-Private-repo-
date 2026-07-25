function loginuser(username, password, callback) {
    let status = '';
    console.log(`Halo user, silahkan login!`);
    setTimeout(() => {
        if(username === "rusdi" && password === "12345"){
            status = `${username} sudah login dengan password ${password}, status: Login berhasil`;
        } else {
            status = `${username} tidak login dengan password yang salah, status: Login tidak berhasil`;
        }
        callback(status);
    }, 2000);
}

function tampilkanHASIL(status){
    console.log(`${status}`);
}

loginuser("rusdi", "12345", tampilkanHASIL);