function ambilprofil() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({Nama: "Risky", Role: "Developer"});
        }, 1000);
    });
}

async function tampilkanprofile(){
    console.log("Mengambil data profile");
    const profil = await ambilprofil()
    console.log(`Halo ${profil.Nama} role kamu adalah ${profil.Role}`);   
}

tampilkanprofile();