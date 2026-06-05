const data = [

{
    bulan: "JANUARI",
    terima: 4238,
    bayar: 3550,
    persen: 83.77,
    penangguhan: 0
},

{
    bulan: "FEBRUARI",
    terima: 4133,
    bayar: 3476,
    persen: 84.10,
    penangguhan: 0
},

{
    bulan: "MARET",
    terima: 4529,
    bayar: 3747,
    persen: 82.73,
    penangguhan: 0
},

{
    bulan: "APRIL",
    terima: 4434,
    bayar: 3809,
    persen: 85.90,
    penangguhan: 31
},

{
    bulan: "MEI",
    terima: 3696,
    bayar: 3078,
    persen: 83.28,
    penangguhan: 14
}

];

let totalTerima = 0;
let totalBayar = 0;
let totalPenangguhan = 0;

const tbody = document.getElementById("tableData");

data.forEach((item, index) => {

    totalTerima += item.terima;
    totalBayar += item.bayar;
    totalPenangguhan += item.penangguhan;

    tbody.innerHTML += `
    <tr>
        <td>${index + 1}</td>
        <td>${item.bulan}</td>
        <td>${item.terima.toLocaleString("id-ID")}</td>
        <td>${item.bayar.toLocaleString("id-ID")}</td>
        <td>${item.persen}%</td>
        <td>${item.penangguhan}</td>
    </tr>
    `;
});

const persenTotal =
((totalBayar / totalTerima) * 100);

document.getElementById("totalTerima").innerHTML =
totalTerima.toLocaleString("id-ID");

document.getElementById("totalBayar").innerHTML =
totalBayar.toLocaleString("id-ID");

document.getElementById("persentase").innerHTML =
persenTotal.toFixed(2) + "%";

document.getElementById("penangguhan").innerHTML =
totalPenangguhan.toLocaleString("id-ID");

document.getElementById("lastUpdate").innerHTML =
new Date().toLocaleString("id-ID");

new Chart(document.getElementById("myChart"), {

    type: "bar",

    data: {

        labels: data.map(x => x.bulan),

        datasets: [

        {
            label: "Terima",
            data: data.map(x => x.terima),
            backgroundColor: "rgba(54,162,235,0.7)"
        },

        {
            label: "Realisasi Bayar",
            data: data.map(x => x.bayar),
            backgroundColor: "rgba(75,192,192,0.7)"
        }

        ]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {
                position: "top"
            }

        }

    }

});