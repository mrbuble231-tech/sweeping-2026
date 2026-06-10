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
}, 120000);
});

/* =========================
CHART 2
========================= */

const ctx2 = document.getElementById("myChart2").getContext("2d");

fetch(SHEET_URL)
.then(response => response.text())
.then(csv => {

    const rows = csv.split("\n");

    const labels2 = [];

    const am = [];
    const pp = [];
    const tb = [];
    const pk = [];
    const pgl = [];
    const rbk = [];
    const penangguhan = [];

    rows.forEach(row => {

    const col = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

if (!col) return;
if (
    !col[5] &&
    !col[6] &&
    !col[7] &&
    !col[8] &&
    !col[9] &&
    !col[10] &&
    !col[11]
) return;

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

    labels2.push(col[1]?.replace(/"/g, "").trim());

    am.push(parseInt(col[5]?.replace(/,/g, "")) || 0);
    pp.push(parseInt(col[6]?.replace(/,/g, "")) || 0);
    tb.push(parseInt(col[7]?.replace(/,/g, "")) || 0);
    pk.push(parseInt(col[8]?.replace(/,/g, "")) || 0);
    pgl.push(parseInt(col[9]?.replace(/,/g, "")) || 0);
    rbk.push(parseInt(col[10]?.replace(/,/g, "")) || 0);
    penangguhan.push(parseInt(col[11]?.replace(/,/g, "")) || 0);

}

    });

    new Chart(ctx2, {

    type: "bar",

    plugins: [ChartDataLabels],

    data: {

        labels: labels2,

        datasets: [

            {
                label: "Angkat Meter",
                data: am,
                backgroundColor: "#f97316"
            },

            {
                label: "Potong Pipa",
                data: pp,
                backgroundColor: "#fbbf24"
            },

            {
                label: "TB",
                data: tb,
                backgroundColor: "#8b5cf6"
            },

            {
                label: "PK",
                data: pk,
                backgroundColor: "#14b8a6"
            },

            {
                label: "PGL",
                data: pgl,
                backgroundColor: "#06b6d4"
            },

            {
                label: "RBK",
                data: rbk,
                backgroundColor: "#000000"
            },

            {
                label: "Penangguhan",
                data: penangguhan,
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

                text:
                "Monitoring Angkat Meter, Potong Pipa, TB, PK, PGL, RBK & Penangguhan"

            }

        }

    }

});
    

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