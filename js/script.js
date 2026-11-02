
// =================================
// SIMULASI PERJALANAN DATA INTERNET
// =================================

// Mengambil elemen dari HTML
const tombol = document.getElementById("mulaiSimulasi");

const status = document.getElementById("statusSimulasi");

// Daftar tahapan perjalanan data
const tahapan = [
    {
        id: "node1",
        pesan: "1. Komputer mengirim permintaan untuk membuka website."
    },
    {
        id: "node2",
        pesan: "2. Router meneruskan permintaan melalui jaringan lokal."
    },
    {
        id: "node3",
        pesan: "3. DNS membantu mencari alamat IP dari nama domain."
    },
    {
        id: "node4",
        pesan: "4. ISP meneruskan data ke jaringan internet."
    },
    {
        id: "node5",
        pesan: "5. Server menerima dan memproses permintaan."
    }
];

// Fungsi menjalankan simulasi
async function jalankanSimulasi() {

    tombol.disabled = true;

    // Menghapus tanda aktif sebelumnya
    document.querySelectorAll(".node").forEach(node => {
        node.classList.remove("aktif");
    });

    // Menjalankan setiap tahapan
    for (const tahap of tahapan) {

        const elemen = document.getElementById(tahap.id);

        elemen.classList.add("aktif");

        status.textContent = tahap.pesan;

        // Jeda 1,5 detik
        await new Promise(resolve => setTimeout(resolve, 1500));

    }

    status.textContent =
        "Selesai! Server telah menerima permintaan. Dalam komunikasi web sebenarnya, respons akan dikirim kembali ke browser.";

    tombol.disabled = false;

}

// INTERAKSI DIAGRAM JARINGAN

const tombolPerangkat = document.querySelectorAll(
    ".perangkat-jaringan"
);

const judulPerangkat = document.getElementById(
    "judul-perangkat"
);

const isiPerangkat = document.getElementById(
    "isi-perangkat"
);

tombolPerangkat.forEach((tombol) => {

    tombol.addEventListener("click", function () {

        tombolPerangkat.forEach((item) => {
            item.classList.remove("aktif");
        });

        this.classList.add("aktif");

        judulPerangkat.textContent =
            this.dataset.judul;

        isiPerangkat.textContent =
            this.dataset.isi;

    });

});

/* SIMULASI CARA BROWSER MEMBUKA WEBSITE */

const inputAlamat = document.getElementById(
    "alamat-website"
);

const tombolBuka = document.getElementById(
    "tombol-buka-website"
);

const hasilSimulasi = document.getElementById(
    "hasil-simulasi"
);

tombolBuka.addEventListener("click", function () {

    let alamat = inputAlamat.value.trim();

    if (alamat === "") {
        hasilSimulasi.innerHTML =
            "<h3>Alamat belum diisi!</h3>" +
            "<p>Silakan masukkan alamat website terlebih dahulu.</p>";
        return;
    }

    // Menambahkan HTTPS jika protokol belum ditulis
    if (!alamat.startsWith("http://") &&
        !alamat.startsWith("https://")) {
        alamat = "https://" + alamat;
    }

    let url;

    try {
        url = new URL(alamat);

        if (url.protocol !== "http:" &&
            url.protocol !== "https:") {
            throw new Error("Protokol tidak didukung");
        }

    } catch (error) {
        hasilSimulasi.innerHTML =
            "<h3>Alamat tidak valid!</h3>" +
            "<p>Periksa kembali alamat website yang kamu masukkan.</p>";
        return;
    }

    const domain = url.hostname;

    hasilSimulasi.innerHTML = `
        <h3>Simulasi akses website</h3>

        <p>
            Alamat tujuan:
            <strong id="domain-tujuan"></strong>
        </p>

        <ol>
            <li>
                <strong>Browser menerima alamat website.</strong>
                <br>
                Browser membaca alamat ${url.protocol}
                dan nama domain tujuan.
            </li>

            <li>
                <strong>DNS mencari alamat IP.</strong>
                <br>
                DNS membantu menemukan alamat IP
                yang berkaitan dengan nama domain.
            </li>

            <li>
                <strong>Perangkat menghubungi jaringan tujuan.</strong>
                <br>
                Paket data dikirim melalui jaringan
                menuju server tujuan.
            </li>

            <li>
                <strong>Koneksi komunikasi disiapkan.</strong>
                <br>
                Mekanismenya dapat melibatkan TCP atau QUIC,
                serta TLS jika menggunakan HTTPS.
            </li>

            <li>
                <strong>Browser mengirim permintaan HTTP.</strong>
                <br>
                Browser meminta halaman atau sumber daya
                kepada server.
            </li>

            <li>
                <strong>Server mengirim respons.</strong>
                <br>
                Server mengembalikan data yang diminta.
            </li>

            <li>
                <strong>Browser menampilkan website.</strong>
                <br>
                Browser memproses HTML, CSS, JavaScript,
                dan sumber daya lainnya.
            </li>
        </ol>

        <p>
            <strong>Simulasi selesai!</strong>
            Kamu sudah mempelajari gambaran proses
            membuka sebuah website.
        </p>
    `;

    document.getElementById("domain-tujuan").textContent =
        domain;

});

/* FITUR PENCARIAN MATERI */

const inputPencarian = document.getElementById(
    "input-pencarian"
);

const tombolPencarian = document.getElementById(
    "tombol-pencarian"
);

const tombolReset = document.getElementById(
    "tombol-reset"
);

const hasilPencarian = document.getElementById(
    "hasil-pencarian"
);

// Daftar kartu yang dapat dicari
const daftarMateri = document.querySelectorAll(
    ".tokoh-card, .komponen-card, .protokol-card, .keamanan-card"
);

function cariMateri() {

    const kataKunci = inputPencarian.value
        .toLowerCase()
        .trim();

    if (kataKunci === "") {
        hasilPencarian.textContent =
            "Masukkan kata kunci terlebih dahulu.";
        return;
    }

    let jumlahDitemukan = 0;

    daftarMateri.forEach((kartu) => {

        const isiMateri = kartu.textContent.toLowerCase();

        if (isiMateri.includes(kataKunci)) {

            kartu.style.display = "";

            jumlahDitemukan++;

        } else {

            kartu.style.display = "none";

        }

    });

    hasilPencarian.textContent =
        jumlahDitemukan +
        " materi ditemukan untuk: " +
        kataKunci;

}

// Tombol pencarian
tombolPencarian.addEventListener(
    "click",
    cariMateri
);

// Pencarian menggunakan tombol Enter
inputPencarian.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            cariMateri();
        }

    }
);

// Tombol reset
tombolReset.addEventListener(
    "click",
    function() {

        inputPencarian.value = "";

        daftarMateri.forEach((kartu) => {
            kartu.style.display = "";
        });

        hasilPencarian.textContent =
            "Semua materi ditampilkan kembali.";

    }
);

// NAVIGASI OTOMATIS

const semuaMenu = document.querySelectorAll("nav a");

const semuaBagian = document.querySelectorAll(
    "main section[id]"
);

function perbaruiNavigasi() {

    let bagianAktif = "";

    semuaBagian.forEach((bagian) => {

        const posisi = bagian.getBoundingClientRect();

        if (posisi.top <= 180 && posisi.bottom > 180) {
            bagianAktif = bagian.id;
        }

    });

    semuaMenu.forEach((menu) => {

        menu.classList.remove("aktif");

        if (menu.getAttribute("href") === "#" + bagianAktif) {
            menu.classList.add("aktif");
        }

    });

}

window.addEventListener("scroll", perbaruiNavigasi);

perbaruiNavigasi();

// TOMBOL KEMBALI KE ATAS

const tombolAtas = document.getElementById("tombol-atas");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        tombolAtas.style.display = "block";
    } else {
        tombolAtas.style.display = "none";
    }

});

tombolAtas.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// Menjalankan simulasi ketika tombol diklik
tombol.addEventListener("click", jalankanSimulasi);

// =====================================
// QUIZ INTERAKTIF FUNDAMENTAL INTERNET
// =====================================

const daftarPertanyaan = [
    {
        pertanyaan: "Apa kepanjangan dari Internet?",
        pilihan: [
            "International Network",
            "Interconnected Network",
            "Internal Networking",
            "Integrated Technology"
        ],
        jawaban: 1,
        penjelasan: "Internet merupakan jaringan dari berbagai jaringan komputer yang saling terhubung."
    },
    {
        pertanyaan: "Apa nama jaringan yang menjadi salah satu cikal bakal internet?",
        pilihan: [
            "Bluetooth",
            "ARPANET",
            "Ethernet",
            "Seluler"
        ],
        jawaban: 1,
        penjelasan: "ARPANET merupakan proyek jaringan komputer yang dikembangkan pada akhir 1960-an."
    },
    {
        pertanyaan: "Siapa tokoh yang dikenal sebagai salah satu penemu World Wide Web?",
        pilihan: [
            "J.C.R Licklider",
            "Leonard Kleinrock",
            "Tim Berners-Lee",
            "Vint Cerf"
        ],
        jawaban: 2,
        penjelasan: "Tim Berners-Lee menciptakan World Wide Web pada tahun 1989."
    },
    {
        pertanyaan: "Apa fungsi utama dari router?",
        pilihan: [
            "Mencetak dokumen",
            "Menghubungkan dan meneruskan data antarjaringan",
            "komunikasi jarak jauh",
            "Mengirim video"
        ],
        jawaban: 1,
        penjelasan: "Router meneruskan paket data menuju jaringan atau tujuan yang sesuai."
    },
    {
        pertanyaan: "Apa kepanjangan dari IP dalam jaringan komputer?",
        pilihan: [
            "Internet Protocol",
            "Internal Program",
            "Information Process",
            "Integrated Port"
        ],
        jawaban: 0,
        penjelasan: "IP adalah Internet Protocol, yaitu protokol yang mengatur pengalamatan dan pengiriman paket data."
    },
    {
        pertanyaan: "Apa fungsi DNS di internet?",
        pilihan: [
            "Menghapus virus",
            "Mengubah nama domain menjadi alamat IP",
            "Mempercepat kipas komputer",
            "Mengatur tampilan monitor"
        ],
        jawaban: 1,
        penjelasan: "DNS membantu menerjemahkan nama domain, seperti example.com, menjadi alamat IP."
    },
    {
        pertanyaan: "Perangkat apa yang digunakan untuk menghubungkan beberapa perangkat dalam LAN?",
        pilihan: [
            "Speaker",
            "Router",
            "Switch",
            "Projector"
        ],
        jawaban: 2,
        penjelasan: "Switch menghubungkan perangkat dalam jaringan lokal atau LAN."
    },
    {
        pertanyaan: "Apa kepanjangan dari HTTP?",
        pilihan: [
            "Hypertext Transfer Protocol",
            "High Technology Transfer Program",
            "Hyperlink Text Tool Process",
            "Home Transfer Text Protocol"
        ],
        jawaban: 0,
        penjelasan: "HTTP adalah protokol yang digunakan untuk pertukaran data antara browser dan server web."
    },
    {
        pertanyaan: "Apa fungsi firewall?",
        pilihan: [
            "Mengconfigurasi jaringan",
            "Mengatur lalu lintas jaringan berdasarkan aturan keamanan",
            "Menghapus sistem operasi",
            "Meyimpan data server"
        ],
        jawaban: 1,
        penjelasan: "Firewall membantu mengontrol lalu lintas jaringan berdasarkan aturan keamanan."
    },
    {
        pertanyaan: "Apa yang dimaksud dengan server?",
        pilihan: [
            "Perangkat atau sistem yang menyediakan layanan kepada perangkat lain",
            "Kabel untuk menghubungkan monitor",
            "Aplikasi untuk mengelola data",
            "Alat untuk mencetak dokumen"
        ],
        jawaban: 0,
        penjelasan: "Server menyediakan layanan atau sumber daya yang dapat digunakan oleh client."
    }
];

// Mengambil elemen HTML Quiz
const nomorPertanyaan = document.getElementById("nomor-pertanyaan");
const skorSementara = document.getElementById("skor-sementara");
const teksPertanyaan = document.getElementById("teks-pertanyaan");
const pilihanJawaban = document.getElementById("pilihan-jawaban");
const feedbackJawaban = document.getElementById("feedback-jawaban");
const tombolBerikutnya = document.getElementById("tombol-berikutnya");
const progressBar = document.getElementById("quiz-progress-bar");
const hasilQuiz = document.getElementById("hasil-quiz");
const nilaiAkhir = document.getElementById("nilai-akhir");
const tombolUlangi = document.getElementById("tombol-ulangi");

// Variabel Quiz
let indeksPertanyaan = 0;
let skor = 0;
let sudahMenjawab = false;

// Menampilkan pertanyaan
function tampilkanPertanyaan() {

    const data = daftarPertanyaan[indeksPertanyaan];

    sudahMenjawab = false;

    nomorPertanyaan.textContent =
        `Pertanyaan ${indeksPertanyaan + 1} dari ${daftarPertanyaan.length}`;

    skorSementara.textContent = `Skor: ${skor}`;

    teksPertanyaan.textContent = data.pertanyaan;

    feedbackJawaban.textContent = "";

    tombolBerikutnya.disabled = true;
    tombolBerikutnya.textContent = "Pertanyaan Berikutnya";

    progressBar.style.width =
        `${(indeksPertanyaan / daftarPertanyaan.length) * 100}%`;

    pilihanJawaban.innerHTML = "";

    data.pilihan.forEach((pilihan, indeks) => {

        const tombol = document.createElement("button");

        tombol.type = "button";
        tombol.textContent = pilihan;

        tombol.addEventListener("click", function () {
            periksaJawaban(indeks, tombol);
        });

        pilihanJawaban.appendChild(tombol);

    });

}

// Memeriksa jawaban
function periksaJawaban(indeksPilihan, tombolDipilih) {

    if (sudahMenjawab) return;

    sudahMenjawab = true;

    const data = daftarPertanyaan[indeksPertanyaan];
    const semuaTombol = pilihanJawaban.querySelectorAll("button");

    semuaTombol.forEach((tombol, indeks) => {

        tombol.disabled = true;

        if (indeks === data.jawaban) {
            tombol.classList.add("benar");
        }

    });

    if (indeksPilihan === data.jawaban) {

        skor++;
        feedbackJawaban.textContent =
            "Benar! " + data.penjelasan;

        tombolDipilih.classList.add("benar");

    } else {

        tombolDipilih.classList.add("salah");

        feedbackJawaban.textContent =
            "Belum tepat. " + data.penjelasan;

    }

    skorSementara.textContent = `Skor: ${skor}`;

    tombolBerikutnya.disabled = false;

    if (indeksPertanyaan === daftarPertanyaan.length - 1) {
        tombolBerikutnya.textContent = "Lihat Hasil";
    }

}

// Menampilkan hasil akhir
function tampilkanHasil() {

    const nilai = Math.round(
        (skor / daftarPertanyaan.length) * 100
    );

    nomorPertanyaan.textContent = "Quiz Selesai";

    progressBar.style.width = "100%";

    teksPertanyaan.hidden = true;
    pilihanJawaban.hidden = true;
    feedbackJawaban.hidden = true;
    tombolBerikutnya.hidden = true;

    hasilQuiz.hidden = false;

    nilaiAkhir.textContent =
        `Jawaban benar: ${skor} dari ${daftarPertanyaan.length}. Nilai kamu: ${nilai}/100.`;

}

// Tombol berikutnya
tombolBerikutnya.addEventListener("click", function () {

    if (!sudahMenjawab) return;

    if (indeksPertanyaan < daftarPertanyaan.length - 1) {

        indeksPertanyaan++;
        tampilkanPertanyaan();

    } else {

        tampilkanHasil();

    }

});

// Mengulang Quiz
tombolUlangi.addEventListener("click", function () {

    indeksPertanyaan = 0;
    skor = 0;

    teksPertanyaan.hidden = false;
    pilihanJawaban.hidden = false;
    feedbackJawaban.hidden = false;
    tombolBerikutnya.hidden = false;

    hasilQuiz.hidden = true;

    tampilkanPertanyaan();

});

// Memulai Quiz
if (
    nomorPertanyaan &&
    skorSementara &&
    teksPertanyaan &&
    pilihanJawaban &&
    tombolBerikutnya &&
    progressBar &&
    hasilQuiz &&
    nilaiAkhir &&
    tombolUlangi &&
    feedbackJawaban
) {
    tampilkanPertanyaan();
}
