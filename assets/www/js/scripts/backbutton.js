function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function init() {
    document.addEventListener("deviceready", onDR, false);
} 
function onDR(){
    document.addEventListener("backbutton", backKeyDown, true);
    //boot your app...
}
function backKeyDown() { 
    // do something here if you wish
    // alert('go back!');
}

