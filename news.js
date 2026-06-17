const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vT51R1B0w5xIRP2Ho92npB6jA6OindLCV_TD0ylsPsRMed2PWvcNJwblCFZQHuOqwszAgSYbX1qHNnl/pub?gid=0&single=true&output=csv";

Papa.parse(SHEET_URL, {

    download: true,
    header: true,

    complete: function(results){
        console.log(results.data);

        let totalAM = 0;
        let totalPP = 0;
        let totalTB = 0;
        let totalPK = 0;
        let totalPGL = 0;
        let totalPNG = 0;

        results.data.forEach(row => {

            totalAM += Number(row["AM"]) || 0;
            totalPP += Number(row["PP"]) || 0;
            totalTB += Number(row["TB"]) || 0;
            totalPK += Number(row["PK"]) || 0;
            totalPGL += Number(row["PGL"]) || 0;
            totalPNG += Number(row["PENANGGUHAN"]) || 0;

        });

        document.getElementById("am").textContent =
            totalAM.toLocaleString("id-ID");

        document.getElementById("pp").textContent =
            totalPP.toLocaleString("id-ID");

        document.getElementById("tb").textContent =
            totalTB.toLocaleString("id-ID");

        document.getElementById("pk").textContent =
            totalPK.toLocaleString("id-ID");

        document.getElementById("pgl").textContent =
            totalPGL.toLocaleString("id-ID");

        document.getElementById("png").textContent =
            totalPNG.toLocaleString("id-ID");

    }

});


// =======================
// JAM DIGITAL
// =======================

function updateClock(){

    const now = new Date();

    const bulan = [
        "JANUARI",
        "FEBRUARI",
        "MARET",
        "APRIL",
        "MEI",
        "JUNI",
        "JULI",
        "AGUSTUS",
        "SEPTEMBER",
        "OKTOBER",
        "NOVEMBER",
        "DESEMBER"
    ];

    document.getElementById("tanggal").innerHTML =
        now.getDate() + " " +
        bulan[now.getMonth()] + " " +
        now.getFullYear();

    document.getElementById("jam").innerHTML =
        now.toLocaleTimeString("id-ID");

}

setInterval(updateClock,1000);

updateClock();


// Refresh otomatis tiap 5 menit
setInterval(() => {

    location.reload();

},300000);
// =========================
// POPUP BERITA
// =========================

window.onload = function(){

    const popup = document.getElementById("popupBerita");

    const berita = document.getElementById("beritaUtama");

    const closeBtn = document.querySelector(".close-btn");

    berita.onclick = function(){

        popup.style.display = "block";

    };

    closeBtn.onclick = function(){

        popup.style.display = "none";

    };

};
// =====================
// POPUP BERITA
// =====================

const popup = document.getElementById("popupBerita");

const berita = document.getElementById("beritaUtama");

const closeBtn = document.querySelector(".close-btn");

berita.onclick = function(){

    popup.style.display = "block";

};

closeBtn.onclick = function(){

    popup.style.display = "none";

};
window.onclick = function(event){

    if(event.target == popup){

        popup.style.display = "none";

    }

};
document.addEventListener("keydown",function(event){

    if(event.key === "Escape"){

        popup.style.display = "none";

    }

});

// =====================
// SLIDESHOW FOTO
// =====================

    
    currentImage--;

    if(currentImage < 0){
        currentImage = images.length - 1;
    }

    popupImage.src = images[currentImage];

    fotoCounter.innerHTML =
    "Foto " + (currentImage + 1) +
    " dari " + images.length;
const ctxBulanan = document.getElementById("myChartBulanan");

new Chart(ctxBulanan, {
    type: "bar",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
        datasets: [{
            label: "Realisasi",
            data: [500, 700, 850, 1200, 1800, 4150],
            backgroundColor: "#00c8ff"
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "white"
                }
            },
            y: {
                ticks: {
                    color: "white"
                }
            }
        }
    }
});
