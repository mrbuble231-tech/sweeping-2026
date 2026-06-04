const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQmQVsvj864GhVdPeHSzE9hBsxvDl39QWiIsQ5qG7XFN_mPsIwglDzzEzhuseWfFkupsDh6v93g0cmR/pub?gid=196995489&single=true&output=csv";

const TARGET_KPI = 100000;

let myChart = null;

async function loadData() {

    try {

        const response = await fetch(CSV_URL + "&t=" + Date.now());
        const csv = await response.text();

        const rows = csv.trim().split("\n");

        // Lewati header
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

            const bulan = cols[1]?.trim() || "";

            const bayar =
                parseInt(
                    String(cols[2]).replace(/[^\d]/g, "")
                ) || 0;

            const belum =
                parseInt(
                    String(cols[3]).replace(/[^\d]/g, "")
                ) || 0;

            const total = bayar + belum;

            totalBayar += bayar;
            totalBelumBayar += belum;

            labels.push(bulan);
            bayarData.push(bayar);
            belumData.push(belum);

            tbody.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${bulan}</td>
                    <td>${bayar.toLocaleString('id-ID')}</td>
                    <td>${belum.toLocaleString('id-ID')}</td>
                    <td>${total.toLocaleString('id-ID')}</td>
                </tr>
            `;
        });

        const totalRekap =
            totalBayar + totalBelumBayar;

        const kpi =
            (totalRekap / TARGET_KPI) * 100;

        document.getElementById("totalBayar").innerHTML =
            totalBayar.toLocaleString('id-ID');

        document.getElementById("totalBelumBayar").innerHTML =
            totalBelumBayar.toLocaleString('id-ID');

        document.getElementById("totalRekap").innerHTML =
            totalRekap.toLocaleString('id-ID');

        document.getElementById("kpi").innerHTML =
            kpi.toFixed(2) + "%";

        const lastUpdate =
            document.getElementById("lastUpdate");

        if (lastUpdate) {
            lastUpdate.innerHTML =
                new Date().toLocaleString("id-ID");
        }

        updateChart(
            labels,
            bayarData,
            belumData
        );

        console.log(
            "Data berhasil diperbarui:",
            new Date().toLocaleTimeString()
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
                    label: "Bayar",
                    data: bayarData,
                    backgroundColor:
                        "rgba(54, 162, 235, 0.7)"
                },
                {
                    label: "Belum Bayar",
                    data: belumData,
                    backgroundColor:
                        "rgba(255, 99, 132, 0.7)"
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



