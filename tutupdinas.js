alert("TUTUPDINAS JS JALAN");

document.getElementById("lastUpdate").textContent =
new Date().toLocaleString("id-ID");

document.getElementById("totalTerima").textContent = "21.030";
document.getElementById("totalBayar").textContent = "17.660";
document.getElementById("potongPipa").textContent = "1.121";
document.getElementById("angkatMeter").textContent = "1.519";
document.getElementById("penangguhan").textContent = "154";
document.getElementById("persentase").textContent = "83.98%";

const ctx = document.getElementById("myChart");

new Chart(ctx, {
    type: "bar",
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
            },
            {
                label: "Belum Bayar",
                data: [683, 657, 779, 625, 618],
            },
            {
                label: "Potong Pipa",
                data: [232, 211, 239, 214, 225],
            },
            {
                label: "Angkat Meter",
                data: [309, 275, 287, 342, 312],
            }
        ]
    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Monitoring Tutup Dinas 2026"
            }   
        }
    }
});
function downloadPDF() {

    const container = document.querySelector(".container");

    const oldTransform = container.style.transform;
    const oldOrigin = container.style.transformOrigin;

    container.style.transform = "scale(0.75)";
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
            container.style.transformOrigin = oldOrigin;
        });
}