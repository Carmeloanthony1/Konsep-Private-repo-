const angka = [1, 2, 3, 4, 5];

const dikalikan2 = angka.map((index) => {
    return index * 2; //kalau variabel 
});

console.log(angka);
console.log(dikalikan2);

function dikalikan3 (index){
    return angka.map(index => ((index * 4) + 3) * 2); //kalau memanggil jadi bentuk function + map
};

const hasilkali3 = dikalikan3(angka); //harus di panggil fungsinya ke array, lalu di print
console.log(hasilkali3);