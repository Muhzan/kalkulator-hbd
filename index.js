const display = document.getElementById("display");
const birthdayAudio = document.getElementById("birthdayAudio"); // Ambil elemen audio

function appendToDisplay(input) {
    // Cegah input multiple zero di awal angka
    if (display.value == "0" && input != "." && input != "+" && input != "-" && input != "*" && input != "/") {
        display.value = input;  // Ganti "0" dengan input yang baru
    } 
    // Cegah input titik sembarangan
    else if (input == ".") {
        const lastNumber = display.value.split(/[\+\-\*\/]/).pop(); // Ambil angka terakhir
        if (!lastNumber.includes(".")) {
            display.value += input; // Tambahkan titik jika belum ada
        }
    }  
    // Cegah input operator berturut-turut
    else if (['+', '-', '*', '/'].includes(input)) {
        const lastChar = display.value.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            display.value = display.value.slice(0, -1); // Hapus operator terakhir
        }
        display.value += input;
    }  
    else {
        display.value += input;
    }

    // Tampilkan pesan jika angka adalah 27
    if (display.value == "27") {
        display.value = "HAPPY BIRTHDAY ARA <3";
        display.classList.add('birthday-message'); // Tambahkan class CSS untuk animasi
        startMarquee(); // Mulai animasi marquee
        birthdayAudio.play(); // Putar musik saat pesan muncul
    } else {
        display.classList.remove('birthday-message'); // Hapus class jika pesan berbeda
    }
}

function clearDisplay() {
    display.value = "";
    display.classList.remove('birthday-message'); // Pastikan class dihapus saat reset
    birthdayAudio.pause(); // Hentikan musik saat direset
    birthdayAudio.currentTime = 0; // Reset waktu musik ke awal
    display.style.animation = 'none'; // Hapus animasi
}

function calculate() {
    try {
        // Cek jika bukan "HAPPY BIRTHDAY ARA <3"
        if (display.value != "HAPPY BIRTHDAY ARA <3" && display.value != "") {
            display.value = eval(display.value);
        }
    } catch (error) {
        display.value = "Error";
    }
}

// Fungsi untuk memulai animasi marquee
function startMarquee() {
    display.style.position = 'relative'; // Mengatur posisi untuk animasi
    display.style.animation = 'scroll-text 10s linear infinite'; // Atur animasi langsung ke display
}
