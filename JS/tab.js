function openTab(evt, tabName) {
  // Mendeklarasikan semua variabel yang diperlukan
  let i, tabcontent, tablinks;
  
  // Mendapatkan semua elemen dengan class "tabcontent" dan menyembunyikan mereka
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Mendapatkan semua elemen dengan class "tablinks" dan menghapus class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Menampilkan tab saat ini, dan menambahkan class "active" pada tombol yang membuka tab tersebut
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Memanggil fungsi openTab() dengan elemen yang memiliki id "defaultOpen" saat halaman pertama kali dimuat
document.getElementById("defaultOpen").click();
