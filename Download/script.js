document.getElementById("dld").addEventListener('click', function() {
    html2canvas(document.getElementById("page")).then(function(canvas) {
        var imgData = canvas.toDataURL('image/jpg');
        var link = document.createElement('a');
        link.download = 'shayari-byRVSR.jpg';
        link.href = imgData;
        link.click();
        window.localStorage.setItem("shayari", "");
        window.open("/Viewer", "_self");
    });
});

function loadit(){
    if(window.localStorage.getItem("shayari") !== "" || window.localStorage.getItem("shayari") !== null){
        document.getElementById("shayari").textContent = window.localStorage.getItem("s001");
        document.getElementById("shayari").style.whiteSpace = 'pre-line';        
    }else{
        window.open("/Viewer")
    }
}

window.onload = loadit;