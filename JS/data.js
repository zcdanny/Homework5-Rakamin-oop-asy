// class Register
class Register {

    static counter = 1; // Static variabel untuk menghitung jumlah registrasi

    constructor(name, age, allowance, counter) {
        this.name = name; // Menyimpan nama
        this.age = age; // Menyimpan usia
        this.allowance = allowance; // Menyimpan tunjangan
        this.counter = counter; // Menyimpan nomor urutan registrasi
    }

    // Menghandle pengiriman formulir
    static handleSubmit(event) {
        event.preventDefault(); // Menghentikan pengiriman form

        // Mengambil nilai dari input form
        let getName = document.getElementById("name");
        let name = getName.value;

        let getAge = document.getElementById("age");
        let age = parseInt(getAge.value);

        let getAllowance = document.getElementById("allowance");
        let allowance = parseInt(getAllowance.value);

        // Memeriksa data yang dimasukkan
        this.checkingData(name, age, allowance)
            .then(() => {
                let success = document.getElementById("success");
                success.innerHTML = "Terima kasih! Informasi Anda telah berhasil dikirimkan";
                success.classList.remove("d-none");

                let danger = document.getElementById("danger");
                danger.classList.add("d-none");
            })
            .catch((error) => {
                let danger = document.getElementById("danger");
                danger.innerHTML = error;
                danger.classList.remove("d-none");

                let success = document.getElementById("success");
                success.classList.add("d-none");
            });

        this.resume(); // Menghitung dan menampilkan rata-rata usia dan tunjangan
    }

    // Validasi data
    static checkingData(name, age, allowance) {
        return new Promise((resolve, reject) => {
            if (name == "" || age == "" || allowance == "") {
                reject("Kolom wajib diisi.");
            } else if (name.length < 10) {
                reject("Nama harus lebih dari 10 karakter.");
            } else if (age < 25) {
                reject("Anda harus berusia minimal 25 tahun.");
            } else if (allowance < 100000) {
                reject("Tunjangan harus lebih dari IDR 100.000");
            } else if (allowance > 1000000) {
                reject("Tunjangan harus kurang dari IDR 1.000.000");
            } else {
                let newRegister = new Register(name, age, allowance, this.counter++);
                newRegister.tableRow(); // Membuat baris baru dalam tabel
                newRegister.tableData(); // Menambahkan data ke dalam baris tabel
                resolve(newRegister);
            }
        });
    }

    // Membuat baris dalam tabel
    tableRow() {
        this.createRow = document.createElement('tr');
        this.createRow.setAttribute('id', `tr-${this.counter}`);
        document.getElementById('table-body').appendChild(this.createRow);
    }

    // Menambahkan data ke dalam baris tabel
    tableData() {
        this.createCellName = document.createElement('td');
        this.createDataName = document.createTextNode(this.name);
        this.createCellName.appendChild(this.createDataName);
        document.getElementById(`tr-${this.counter}`).appendChild(this.createCellName);

        this.createCellAge = document.createElement('td');
        this.createDataAge = document.createTextNode(this.age);
        this.createCellAge.appendChild(this.createDataAge);
        document.getElementById(`tr-${this.counter}`).appendChild(this.createCellAge);

        this.createCellAllowance = document.createElement('td');
        this.createDataAllowance = document.createTextNode(this.allowance);
        this.createCellAllowance.appendChild(this.createDataAllowance);
        document.getElementById(`tr-${this.counter}`).appendChild(this.createCellAllowance);
    }

    // Menghitung dan menampilkan rata-rata usia dan tunjangan
    static resume() {
        let totalAge = 0;
        let totalAllowance = 0;
        let countAge = 0;
        let countAllowance = 0;
        let age = document.getElementsByTagName("td");
        let allowance = document.getElementsByTagName("td");

        // Menghitung total usia
        for (let index = 1; index <= age.length; index += 3) {
            totalAge += parseInt(age[index].innerHTML);
            countAge++;
        }

        // Menghitung total tunjangan
        for (let index = 2; index <= allowance.length; index += 3) {
            totalAllowance += parseInt(allowance[index].innerHTML);
            countAllowance++;
        }

        // Menghitung rata-rata usia dan tunjangan
        let avgAge = Math.round(totalAge / countAge);
        let avgAllowance = Math.round(totalAllowance / countAllowance);

        // Menampilkan rata-rata usia dan tunjangan di dalam elemen HTML
        document.getElementById("avg-age").innerHTML = avgAge;
        document.getElementById("avg-allowance").innerHTML = `IDR ${avgAllowance}`;
    }
}
