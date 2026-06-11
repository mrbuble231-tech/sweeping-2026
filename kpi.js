const SHEET_URL_TUTUPAN =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vRr8R_L7SK3go995gTrx9UZUJMtUeyrCq1SLSrtYlN9HlZeHKFUODicrD_9cyr8H57EppczJ3ID7k4-/pub?gid=920702944&single=true&output=csv";

Papa.parse(SHEET_URL_TUTUPAN,{

    download:true,
    header:true,

    complete:function(results){

        let totalAM=0;
        let totalPP=0;
        let totalTB=0;
        let totalPK=0;
        let totalPGL=0;
        let totalPNG=0;

       results.data.forEach(row => {

    console.log(row);
console.log(Object.keys(row));
    totalAM += parseInt(row["AM"]) || 0;
totalPP += parseInt(row["PP"]) || 0;
totalTB += parseInt(row["TB"]) || 0;
totalPK += parseInt(row["PK"]) || 0;
totalPGL += parseInt(row["PGL"]) || 0;
const penangguhan =
    row["PENANGGUHAN"] ||
    row["PENANGGUHAN "] ||
    row["Penangguhan"] ||
    row["PENANGGUHAN\r"];

totalPNG += parseInt(row["PENANGUHAN"]) || 0;
});

        document.getElementById("am").innerHTML =
            totalAM.toLocaleString("id-ID");

        document.getElementById("pp").innerHTML =
            totalPP.toLocaleString("id-ID");

        document.getElementById("tb").innerHTML =
            totalTB.toLocaleString("id-ID");

        document.getElementById("pk").innerHTML =
            totalPK.toLocaleString("id-ID");

        document.getElementById("pgl").innerHTML =
            totalPGL.toLocaleString("id-ID");

        document.getElementById("png").innerHTML =
            totalPNG.toLocaleString("id-ID");

    }

});