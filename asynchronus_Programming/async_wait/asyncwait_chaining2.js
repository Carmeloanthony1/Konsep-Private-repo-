function loginuser(username, password){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(username === "Risky" && password === "123"){
                resolve({username: "Risky", Role: "admin", Status: "Verified"});  //kirim lagi ke status
            } else {
                reject('Username dan password salah');
            }
        }, 2000);
    });
}

function dashboardpage(user){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(user.Role === "admin"){ //karena rolenya admin
                resolve(`Welcome at our dashboard`); //kirim ini sebagai variabel dashboard
            } else {
                reject(`Akses di tolak`);
            }
        }, 2000);
    });
}

async function akses(user, pass){
    console.log("Mencoba login...");
    try {
        const status = await loginuser(user, pass); //input kirim ke function login user
        console.log("Login berhasil, Role anda saat ini adalah " + status.Role);

        const dashboard = await dashboardpage(status);  //status tadi kirim lagi ke dashboardpage sebagai parameter user
        console.log(dashboard); //hasilnya welcome at our dashboard
    } catch(error){
        console.error("Terdapat error: " + error);
    }
}

akses("Risky", "123"); //passing ke line 25