/*const ambildata = async () => {
    try {
        console.log("Mengambil data dari backend...");
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const data = await response.json(); //inisialisasi objek di atas di ubah menjadi json agar bisa di baca 
        console.log(`Nama : ${data.name} | Email : ${data.email} | Phone : ${data.phone}`);
    } catch (error) {
        console.log("Terdapat masalah, ", error);
    }
}

ambildata();
*/

const tugasharian = async () => {
    try {
        console.log("Sedang mengambil data dari backend...");
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = await response.json();
        console.log(`Tugas avaible : ${data.title} | status : ${data.completed}`);
    } catch (error) {
        console.log(`Ada kesalahana, `, error);
    }
};

tugasharian();