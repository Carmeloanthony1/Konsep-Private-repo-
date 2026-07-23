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

autoemail(user1);
autoemail(user2);