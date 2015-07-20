$('#inicio').live('pageshow', function(event){
setTimeout('intro();',2500);
});

function intro(){
$.mobile.changePage("login.html",{ transition: "fade"});

}