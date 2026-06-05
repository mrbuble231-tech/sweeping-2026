function updateChart(data) {

    const ctx = document.getElementById("myChart");

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: data.map(x => x.bulan),

            datasets: [

                {
                    label: "Realisasi Bayar",
                    data: data.map(x => x.bayar),
                    backgroundColor: "rgba(54,162,235,0.8)"
                },

                {
                    label: "Belum Bayar",
                    data: data.map(x => x.terima - x.bayar),
                    backgroundColor: "rgba(255,99,132,0.8)"
                },

                {
                    label: "Potong Pipa",
                    data: data.map(x => x.ppp),
                    backgroundColor: "rgba(255,206,86,0.8)"
                },

                {
                    label: "Angkat Meter",
                    data: data.map(x => x.am),
                    backgroundColor: "rgba(75,192,192,0.8)"
                }

            ]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    position: "top"
                },

                title: {
                    display: true,
                    text: "Monitoring Tutup Dinas 2026"
                }

            },

            scales: {

                y: {
                    beginAtZero: true
                }

            }

        }

    });

}