function updateClock() {
    document.getElementById("lastUpdate").textContent =
        new Date().toLocaleString("id-ID");
}

updateClock();

setInterval(updateClock, 1000);

document.getElementById("totalTerima").textContent = "21.030";
document.getElementById("totalBayar").textContent = "17.660";
document.getElementById("potongPipa").textContent = "1.121";
document.getElementById("angkatMeter").textContent = "1.519";
document.getElementById("penangguhan").textContent = "45";
document.getElementById("persentase").textContent = "83.98%";

/* =========================
CHART 1
========================= */

const ctx1 = document.getElementById("myChart").getContext("2d");

new Chart(ctx1, {
type: "bar",
plugins: [ChartDataLabels],

data: {
    labels: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei"
    ],

    datasets: [
        {
            label: "Terima Bon",
            data: [4238, 4133, 4529, 4434, 3696],
            backgroundColor: "#22c55e"
        },
        {
            label: "Realisasi Bayar",
            data: [3555, 3476, 3747, 3809, 3078],
            backgroundColor: "#2563eb"
        },
        {
            label: "Belum Bayar",
            data: [683, 657, 779, 625, 618],
            backgroundColor: "#dc2626"
        }
    ]
},

options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        datalabels: {
            color: "#000",
            anchor: "end",
            align: "top",
            font: {
                weight: "bold"
            },
            formatter: value =>
                value.toLocaleString("id-ID")
        },

        title: {
            display: true,
            text: "Monitoring Terima Bon, Realisasi Bayar & Belum Bayar"
        }
    }
}

});

/* =========================
CHART 2
========================= */

const ctx2 = document.getElementById("myChart2").getContext("2d");

new Chart(ctx2, {
type: "bar",
plugins: [ChartDataLabels],

data: {
    labels: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei"
    ],

    datasets: [
        {
            label: "Angkat Meter",
            data: [303, 275, 287, 342, 312],
            backgroundColor: "#f97316"
        },
        {
            label: "Potong Pipa",
            data: [232, 211, 239, 214, 225],
            backgroundColor: "#fbbf24"
        },
        {
            label: "PGL",
            data: [103, 116, 167, 21, 51],
            backgroundColor: "#06b6d4"
        },
        {
            label: "TB",
            data: [31, 38, 60, 11, 14],
            backgroundColor: "#8b5cf6"
        },
        {
            label: "PK",
            data: [16, 14, 28, 6, 2],
            backgroundColor: "#14b8a6"
        },
        {
            label: "Penangguhan",
            data: [0, 0, 0, 31, 14],
            backgroundColor: "#ec4899"
        }
    ]
},

options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        datalabels: {
            color: "#000",
            anchor: "end",
            align: "top",
            font: {
                weight: "bold"
            },
            formatter: value =>
                value.toLocaleString("id-ID")
        },

        title: {
            display: true,
            text: "Realisasi Belum Bayar"
        }
    }
}

});

/* =========================
DOWNLOAD PDF
========================= */

function downloadPDF() {

const container = document.querySelector(".container");

const oldTransform = container.style.transform;
const oldWidth = container.style.width;

container.style.width = "1000px";
container.style.transform = "scale(0.85)";
container.style.transformOrigin = "top left";

html2pdf()
    .from(container)
    .set({
        margin: 0,
        filename: "Dashboard_Tutup_Dinas_2026.pdf",
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: "mm",
            format: "a3",
            orientation: "landscape"
        }
    })
    .save()
    .then(() => {
        container.style.transform = oldTransform;
        container.style.width = oldWidth;
    });

}
const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vRr8R_L7SK3go995gTrx9UZUJMtUeyrCq1SLSrtYlN9HlZeHKFUODicrD_9cyr8H57EppczJ3ID7k4-/pub?output=csv";

function parseNumber(value) {
if (!value) return 0;

```
return Number(
    value
        .toString()
        .replace(/\./g, "")
        .replace(/,/g, ".")
        .replace(/[^0-9.-]/g, "")
) || 0;
```

}

async function loadDashboard() {

```
document.getElementById("lastUpdate").textContent =
    new Date().toLocaleString("id-ID");

const response = await fetch(SHEET_URL);
const csv = await response.text();

console.log(csv);

alert(
    "CSV berhasil terbaca. Buka F12 > Console lalu kirim isi CSV ke ChatGPT agar mapping kolom bisa diselesaikan."
);
```

}

loadDashboard();

function downloadPDF() {

```
const container =
    document.querySelector(".container");

html2pdf()
    .from(container)
    .set({
        margin: 0,
        filename: "Dashboard_Tutup_Dinas_2026.pdf",
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: "mm",
            format: "a3",
            orientation: "landscape"
        }
    })
    .save();
```

}
