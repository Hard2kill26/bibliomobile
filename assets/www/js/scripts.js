var serviceURL = "http://jamtechcorp.com/services/";
	
$('#home').live('pageshow', function(event){
getHomeList();
});

function getHomeList() {
    var user = getUrlVars()["user"];
    multaUser();
		
		var cat_h = 'catalogo.html?user='+user;
		var hist_h = 'historial.html?user='+user;
		var res_h = 'reserva.html?user='+user;
		var perfil_h = 'perfil.html?user='+user;
		var prestamos_h = 'prestamos.html?user='+user;
		var contacto_h = 'contacto.html?user='+user;

		$('#catalogo_link').attr('href',cat_h);
		$('#historial_link').attr('href',hist_h);
		$('#reservas_link').attr('href',res_h);
		$('#perfil_link').attr('href',perfil_h);
		$('#prestamos_link').attr('href',prestamos_h);
		$('#contacto_link').attr('href',contacto_h);
}

function getUrlVars() {
    var vars = [], hash;
    var prueba = window.location.href.replace(/(#).*(\?)/,'&'); //reemplaza todo lo existente entre (# y ?) por &.
    prueba = prueba.replace(/(#)/,'&'); //reemplaza # por &.
    var hashes = prueba.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function multaUser(){
var user= getUrlVars()["user"];
	$.getJSON(serviceURL + 'getmulta2.php?user='+user, function(data) {
		$.each(data.items, function(i, item) {
			if(item.count > 0) {
			$('#multa').html('<center class="message">Usted presenta una multa actualmente, revise su perfil para m&aacute;s detalle</center>');
			}else
				{
					$('#multa').html('');
				}
		});
	});	
}

function logout(){
	window.location.href = 'login.html';
	//$.mobile.changePage("login.html",{ transition: "fade"});
}