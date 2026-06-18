const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vT51R1B0w5xIRP2Ho92npB6jA6OindLCV_TD0ylsPsRMed2PWvcNJwblCFZQHuOqwszAgSYbX1qHNnl/pub?gid=1854031312&single=true&output=csv";

Papa.parse(SHEET_URL, {

    download: true,
    header: true,

    complete: function(results){

        let totalAM = 0;
        let totalPP = 0;
        let totalTB = 0;
        let totalPK = 0;
        let totalPGL = 0;
        let totalPNG = 0;

        results.data.forEach(row => {

            totalAM += Number(row["AM"]) || 0;
            totalPP += Number(row["PP"]) || 0;
            totalTB += Number(row["TB"]) || 0;
            totalPK += Number(row["PK"]) || 0;
            totalPGL += Number(row["PGL"]) || 0;
            totalPNG += Number(row["PENANGGUHAN"]) || 0;

        });

        document.getElementById("am").textContent =
            totalAM.toLocaleString("id-ID");

        document.getElementById("pp").textContent =
            totalPP.toLocaleString("id-ID");

        document.getElementById("tb").textContent =
            totalTB.toLocaleString("id-ID");

        document.getElementById("pk").textContent =
            totalPK.toLocaleString("id-ID");

        document.getElementById("pgl").textContent =
            totalPGL.toLocaleString("id-ID");

        document.getElementById("png").textContent =
            totalPNG.toLocaleString("id-ID");

    }

});

// =======================
// JAM DIGITAL
// =======================

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

    document.getElementById("tanggal").innerHTML =
        now.getDate() + " " +
        bulan[now.getMonth()] + " " +
        now.getFullYear();

    document.getElementById("jam").innerHTML =
        now.toLocaleTimeString("id-ID");

}

setInterval(updateClock,1000);

updateClock();


// Refresh otomatis tiap 5 menit
setInterval(() => {

    location.reload();

},300000);
// =========================
// POPUP BERITA
// =========================

window.onload = function(){

    const popup = document.getElementById("popupBerita");

    const berita = document.getElementById("beritaUtama");

    const closeBtn = document.querySelector(".close-btn");

    berita.onclick = function(){

        popup.style.display = "block";

    };

    closeBtn.onclick = function(){

        popup.style.display = "none";

    };

};

// =========================
// CHART MONITORING REALISASI
// =========================

Papa.parse(SHEET_URL,{

    download:true,
    header:true,

    complete:function(results){

        let bulan = [];
        let realisasi = [];

        results.data.forEach(row=>{

            if(row["BULAN"]){

                bulan.push(row["BULAN"]);

                let total =

                    (Number(row["AM"]) || 0)+
                    (Number(row["PP"]) || 0)+
                    (Number(row["TB"]) || 0)+
                    (Number(row["PK"]) || 0)+
                    (Number(row["PGL"]) || 0)+
                    (Number(row["PENANGGUHAN"]) || 0);

                realisasi.push(total);

            }

        });
console.log(bulan);
console.log(realisasi);
        const ctxBulanan =
        document.getElementById("myChartBulanan");
Chart.register(ChartDataLabels);
       new Chart(ctxBulanan,{

    type:"bar",

    data:{
        labels: bulan.filter((b,i)=>realisasi[i]>0),

        datasets:[{
            label:"Realisasi",

            data:realisasi.filter(v=>v>0),

            backgroundColor:"#00c8ff",

            borderRadius:10
        }]
    },

    options:{

        responsive:true,
        maintainAspectRatio:false,

        plugins:{

            legend:{
                labels:{
                    color:"white",
                    font:{
                        size:16,
                        weight:"bold"
                    }
                }
            },

            tooltip:{
                titleFont:{
                    size:16
                },
                bodyFont:{
                    size:16
                }
            },

            datalabels:{

                color:"#ffffff",

                anchor:"end",

                align:"top",

                font:{
                    size:14,
                    weight:"bold"
                },

                formatter:function(value){
                    return value.toLocaleString("id-ID");
                }

            }

        },
        datalabels:{
    color:"#ffffff",

    anchor:"end",

    align:"top",

    offset:5,

    font:{
        size:18,
        weight:"bold"
    },

    formatter:function(value){
        return value.toLocaleString("id-ID");
    }
},

        scales:{

            x:{
                ticks:{
                    color:"white",
                    font:{
                        size:18,
                        weight:"bold"
                    }
                },

                grid:{
                    color:"rgba(255,255,255,0.05)"
                }
            },

            y:{
                beginAtZero:true,

                ticks:{
                    color:"white",
                    font:{
                        size:16,
                        weight:"bold"
                    }
                },

                grid:{
                    color:"rgba(255,255,255,0.05)"
                }
            }

        }

    }

});
 }

});