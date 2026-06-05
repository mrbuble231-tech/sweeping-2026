let myChart = null;

const data = [

{
bulan:"Januari",
terima:4238,
bayar:3550
},

{
bulan:"Februari",
terima:4133,
bayar:3476
},

{
bulan:"Maret",
terima:4529,
bayar:3747
},

{
bulan:"April",
terima:4434,
bayar:3809
},

{
bulan:"Mei",
terima:3696,
bayar:3078
}

];

function loadData(){

let totalTerima = 0;
let totalBayar = 0;

const tbody =
document.getElementById("tableData");

tbody.innerHTML = "";

data.forEach((x,index)=>{

let persen =
((x.bayar/x.terima)*100).toFixed(2);

totalTerima += x.terima;
totalBayar += x.bayar;

tbody.innerHTML += `
<tr>
<td>${index+1}</td>
<td>${x.bulan}</td>
<td>${x.terima.toLocaleString("id-ID")}</td>
<td>${x.bayar.toLocaleString("id-ID")}</td>
<td>${persen}%</td>
</tr>
`;

});

const totalAM = 1519;
const totalPPP = 1121;
const totalPenangguhan = 45;

const persentase =
((totalBayar/totalTerima)*100);

document.getElementById("totalTerima")
.innerHTML =
totalTerima.toLocaleString("id-ID");

document.getElementById("realisasiBayar")
.innerHTML =
totalBayar.toLocaleString("id-ID");

document.getElementById("potongPipa")
.innerHTML =
totalPPP.toLocaleString("id-ID");

document.getElementById("angkatMeter")
.innerHTML =
totalAM.toLocaleString("id-ID");

document.getElementById("penangguhan")
.innerHTML =
totalPenangguhan.toLocaleString("id-ID");

document.getElementById("persentase")
.innerHTML =
persentase.toFixed(2) + "%";

document.getElementById("lastUpdate")
.innerHTML =
new Date().toLocaleString("id-ID");

updateChart();

}

function updateChart(){

const ctx =
document.getElementById("myChart");

if(myChart){
myChart.destroy();
}

myChart =
new Chart(ctx,{

type:"bar",

data:{

labels:data.map(x=>x.bulan),

datasets:[

{
label:"Terima",
data:data.map(x=>x.terima),
backgroundColor:"rgba(54,162,235,0.7)"
},

{
label:"Realisasi Bayar",
data:data.map(x=>x.bayar),
backgroundColor:"rgba(75,192,192,0.7)"
}

]

},

options:{
responsive:true,

plugins:{
legend:{
position:"top"
}
}
}

});

}

loadData();
