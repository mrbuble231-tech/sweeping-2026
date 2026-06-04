const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQmQVsvj864GhVdPeHSzE9hBsxvDl39QWiIsQ5qG7XFN_mPsIwglDzzEzhuseWfFkupsDh6v93g0cmR/pub?gid=1670174235&single=true&output=csv";

// Target KPI Tahunan
const TARGET_KPI = 176000000;

let myChart = null;

// Konversi "Rp29.612.925" menjadi 29612925
function rupiahToNumber(text) {

    return parseInt(
        String(text)
            .replace(/Rp/gi, "")
            .replace(/\./g, "")
            .replace(/,/g, "")
            .replace(/"/g, "")
            .trim()
    ) || 0;

}

async function loadData() {

    try {

        const response =
            await fetch(CSV_URL + "&t=" + Date.now());

        const csv =
            await response.text();

        const rows =
            csv.trim().split("\n");

        // Buang header
        rows.shift();

        let totalBayar = 0;
        let totalBelumBayar = 0;

        const labels = [];
        const bayarData = [];
        const belumData = [];

        const tbody =
            document.getElementById("tableData");

        tbody.innerHTML = "";

        rows.forEach((row, index) => {

            const cols = row.split(",");

            if (cols.length < 4) return;

            const bulan =
                cols[1]?.trim() || "";

            const bayar =
                rupiahToNumber(cols[2]);

            const belum =
                rupiahToNumber(cols[3]);

            const total =
                bayar + belum;

            totalBayar += bayar;
            totalBelumBayar += belum;

            labels.push(bulan);
            bayarData.push(bayar);
            belumData.push(belum);

            tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${bulan}</td>
                    <td>Rp ${bayar.toLocaleString('id-ID')}</td>
                    <td>Rp ${belum.toLocaleString('id-ID')}</td>
                    <td>Rp ${total.toLocaleString('id-ID')}</td>
                </tr>
            `;

        });

        const totalRekap =
    totalBayar + totalBelumBayar;

const progressKPI =
    (totalBayar / TARGET_KPI) * 100;

        document.getElementById("totalBayar").innerHTML =
            "Rp " +
            totalBayar.toLocaleString('id-ID');

        document.getElementById("totalBelumBayar").innerHTML =
            "Rp " +
            totalBelumBayar.toLocaleString('id-ID');

        document.getElementById("totalRekap").innerHTML =
            "Rp " +
            totalRekap.toLocaleString('id-ID');

        document.getElementById("kpi").innerHTML =
            progressKPI.toFixed(2) + "%";

        document.getElementById("lastUpdate").innerHTML =
            new Date().toLocaleString("id-ID");

        updateChart(
            labels,
            bayarData,
            belumData
        );

    } catch (error) {

        console.error(
            "Gagal mengambil data:",
            error
        );

    }

}

function updateChart(
    labels,
    bayarData,
    belumData
) {

    const ctx =
        document.getElementById("myChart");

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [
                {
                    label: "Bayar Rupiah",
                    data: bayarData,
                    backgroundColor:
                        "rgba(54,162,235,0.7)"
                },
                {
                    label: "Belum Bayar Rupiah",
                    data: belumData,
                    backgroundColor:
                        "rgba(255,99,132,0.7)"
                }
            ]

        },

        options: {

            responsive: true,

            scales: {
                y: {
                    beginAtZero: true
                }
            }

        }

    });

}

// Load pertama
loadData();

// Refresh otomatis setiap 15 detik
setInterval(loadData, 15000);