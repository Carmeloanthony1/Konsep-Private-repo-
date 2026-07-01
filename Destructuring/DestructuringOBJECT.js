/*normal way
const user = {
    name: "Rizki",
    age: 25,
    role: "Student"
}

console.log(user.role)*/

/*Destructuring Object
const user = {
    name: "Rizki", 
    age: 25,
    role: "Student"
}
const {name, age, role} = user;

console.log(user.nama);
console.log(user.age);
console.log(user.role); */

/*const produk = {
    nama: "Laptop",
    ram : 4,
    disk: 256
};

const {nama, ram, disk} = produk;
console.log(produk.nama, produk.ram, produk.disk);*/

const koordinat = [120, -45, 88];
const [x, y, z] = koordinat;
console.log(x, z, z);