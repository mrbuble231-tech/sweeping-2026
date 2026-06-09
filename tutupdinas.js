const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vRr8R_L7SK3go995gTrx9UZUJMtUeyrCq1SLSrtYlN9HlZeHKFUODicrD_9cyr8H57EppczJ3ID7k4-/pub?gid=920702944&single=true&output=csv";

function updateClock() {
    document.getElementById("lastUpdate").textContent =
        new Date().toLocaleString("id-ID");
}
updateClock();
setInterval(updateClock, 1000);
function downloadPDF() {

    const container = document.querySelector(".container");

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
}

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

fetch(SHEET_URL)
.then(response => response.text())
.then(csv => {

    const rows = csv.split("\n");

    const labels = [];
    const terimaBon = [];
    const realisasiBayar = [];
    const belumBayar = [];

    rows.forEach(row => {

    console.log(row);

    if (
        row.includes("Januari") ||
        row.includes("Februari") ||
        row.includes("Maret") ||
        row.includes("April") ||
        row.includes("Mei") ||
        row.includes("Juni") ||
        row.includes("Juli") ||
        row.includes("Agustus") ||
        row.includes("September") ||
        row.includes("Oktober") ||
        row.includes("November") ||
        row.includes("Desember")
    ) {
            const col = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

if (!col) return;
            console.log("BULAN =", col[1]);
console.log("BAYAR =", col[3]);
console.log("TERIMA =", col[13]);
            if (!col) return;

            const bulan = col[1]
                ?.replace(/"/g, "")
                .trim();

            
 const totalUsulan =
parseInt(
    col[2]
        ?.replace(/"/g,"")
        ?.replace(/,/g,"")
) || 0;

const bayar =
parseInt(
    col[4]
        ?.replace(/"/g,"")
        ?.replace(/,/g,"")
) || 0;

const belum = totalUsulan - bayar;

labels.push(bulan);
terimaBon.push(totalUsulan);
realisasiBayar.push(bayar);
belumBayar.push(belum);

        }

    });

    console.log("LABELS =", labels);
    console.log("TERIMA =", terimaBon);
    console.log("BAYAR =", realisasiBayar);

    new Chart(ctx1, {

        type: "bar",

        plugins: [ChartDataLabels],

        data: {

            labels: labels,

            datasets: [
                {
                    label: "Terima Bon",
                    data: terimaBon,
                    backgroundColor: "#22c55e"
                },
                {
                    label: "Realisasi Bayar",
                    data: realisasiBayar,
                    backgroundColor: "#2563eb"
                },
                {
                    label: "Belum Bayar",
                    data: belumBayar,
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

                    text:
                    "Monitoring Terima Bon, Realisasi Bayar & Belum Bayar"
                }
            }
        }
    });


setInterval(() => {
    location.reload();
}, 300000);
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