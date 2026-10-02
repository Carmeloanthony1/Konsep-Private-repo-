function ceksaldo(){
    return new Promise((resolve) => {
        console.log("Mengecheck saldo");
        setTimeout(() => {
            resolve({saldo: 500000});
        }, 2000);
    });
}

async function main(){
    const isisaldo = await ceksaldo();
    console.log(`Saldo kamu saat ini:` + isisaldo.saldo);
}

main();