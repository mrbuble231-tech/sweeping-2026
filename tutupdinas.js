document.getElementById("lastUpdate").textContent =
    new Date().toLocaleString("id-ID");

document.getElementById("totalTerima").textContent = "21.030";
document.getElementById("totalBayar").textContent = "17.660";
document.getElementById("potongPipa").textContent = "1.121";
document.getElementById("angkatMeter").textContent = "1.525";
document.getElementById("penangguhan").textContent = "257";
document.getElementById("persentase").textContent = "84%";

const ctx = document.getElementById("myChart").getContext("2d");

new Chart(ctx, {
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
                label: "Realisasi Bayar",
                data: [3555, 3476, 3747, 3809, 3078],
                backgroundColor: "#16a34a"
            },
            {
                label: "Belum Bayar",
                data: [683, 657, 779, 625, 618],
                backgroundColor: "#dc2626"
            },
            {
                label: "Potong Pipa",
                data: [232, 211, 239, 214, 225],
                backgroundColor: "#ea580c"
            },
            {
                label: "Angkat Meter",
                data: [309, 275, 287, 342, 312],
                backgroundColor: "#2563eb"
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
                offset: 4,

                font: {
                    weight: "bold",
                    size: 11
                },

                formatter: (value) => {
                    return value.toLocaleString("id-ID");
                }
            },

            legend: {
                position: "top"
            },

            title: {
                display: true,
                text: "Monitoring Tutup Dinas 2026",
                font: {
                    size: 20
                }
            }
        },

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function downloadPDF() {

    const container = document.querySelector(".container");

    const oldTransform = container.style.transform;
    const oldWidth = container.style.width;

    container.style.width = "1000px";
    container.style.transform = "scale(0.50)";
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