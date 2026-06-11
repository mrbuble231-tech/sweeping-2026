const SHEET_URL = "Lhttps://docs.google.com/spreadsheets/d/e/2PACX-1vT51R1B0w5xIRP2Ho92npB6jA6OindLCV_TD0ylsPsRMed2PWvcNJwblCFZQHuOqwszAgSYbX1qHNnl/pub?gid=0&single=true&output=csvINK_CSV_KAMU";

// Ambil data dari Google Sheet
fetch(SHEET_URL)
.then(response => response.text())
.then(csv => {

    const rows = csv.split("\n");

    // Headline
    document.getElementById("headline1").innerHTML =
        rows[0].split(",")[1];

    document.getElementById("headline2").innerHTML =
        rows[1].split(",")[1];

    document.getElementById("headline3").innerHTML =
        rows[2].split(",")[1];

    // Deskripsi
    document.getElementById("deskripsi").innerHTML =
        rows[3].split(",")[1];

    // KPI
    document.getElementById("am").innerHTML =
        rows[4].split(",")[1];

    document.getElementById("pp").innerHTML =
        rows[5].split(",")[1];

    document.getElementById("tb").innerHTML =
        rows[6].split(",")[1];

    document.getElementById("pk").innerHTML =
        rows[7].split(",")[1];

    document.getElementById("pgl").innerHTML =
        rows[8].split(",")[1];

    document.getElementById("png").innerHTML =
        rows[9].split(",")[1];

});


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

    const tanggal =
        now.getDate() +
        " " +
        bulan[now.getMonth()] +
        " " +
        now.getFullYear();

    document.getElementById("tanggal").innerHTML = tanggal;

    document.getElementById("jam").innerHTML =
        now.toLocaleTimeString("id-ID");
}

setInterval(updateClock,1000);

updateClock();
setInterval(() => {
    location.reload();
}, 300000);
