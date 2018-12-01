function kalkulator() {
    let angka = document.querySelectorAll('input');
    let i1= parseInt (angka[0].value) ; //angka pertama
    let i2= parseInt (angka[1].value) ; //angka kedua
    angka[2].value= i1 + i2 ;
    let pesan = document.getElementById('message');
    pesan.innerHTML="Selesai";
   }
   let tombol = document.querySelector('button');
   tombol.addEventListener('click', kalkulator);
   