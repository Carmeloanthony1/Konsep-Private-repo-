const user1 = {
    nama: 'john',
    totalbeli: 100000,
    diskon: 10
};

const user2 = {
  username: "Rusdi",
  umur: 20,
  role: "Backend Dev",
  statusAktif: false
};

function kasir ({ nama, totalbeli, diskon }){
    const total_diskon = (totalbeli * diskon) / 100;
    const hargasetelah_diskon = totalbeli - total_diskon;
    console.log(`Hai ${nama}, total belanjaan kamu ${totalbeli}, kamu dapat diskon ${diskon}, jadi totalnya ${hargasetelah_diskon}`);
}

function profilegenerator({username, role, statusAktif}, ...Hobi){ //rest parameter, misal dia mau langsung daruh di parametr untuk input bisa juga tinggal kasih ...
    console.log("Profile generator");
    console.log(`Nama : ${username}`);
    console.log(`Role : ${role}`);
    if(statusAktif){
        console.log(`Status : Aktif`);
    } else {
        console.log(`Status: Tidak aktif`);
    }
    console.log(`Hobi : ${Hobi}`)   

}
kasir(user1);
profilegenerator(user2, ['Coding', ' main game']);
