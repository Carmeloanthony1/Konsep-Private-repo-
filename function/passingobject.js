const user1 = {
    nama: 'john',
    role: "admin",
    level: "100"
};

const user2 = {
    nama: 'spiderman',
    role: "hero",
    level: "10000"
};


function autoemail(data){
    console.log(`Halo ${data.nama}, role kamu sekarang ${data.role} dan kamu sekarang level ${data.level}`);
}

function autoemail2(data){ //ini nama tekniknya itu destructuring
    const nama = data.nama;
    const role = data.role;
    const level = data.level;

    console.log(`Halo ${nama}, role kamu sekarang ${role} dan kamu sekarang level ${level}`);
}

function autoemail3({ nama, role, level }){ //cara modern untuk destruturing 
    console.log(`Halo ${nama}, saat ini kamu role ${role} dan kamu level ${level}`);
}
autoemail(user1);
autoemail(user2);

autoemail2(user1);
autoemail2(user2);

autoemail3(user1);