var serviceURL = "http://jamtechcorp.com/services/";

$('#perfil').live('pageshow', function(event){
datos();
});

function datos(){
var user = getUrlVars()["user"];
$('#perfilDatos li').remove();

	$.getJSON(serviceURL + 'getperfil.php?user='+user, function(data) {
		$.each(data.items, function(i, item) {
			$('#perfilDatos').append('<li data-theme="a"><span id="tam2">'+ item.descripcion_rol +'</span></li>'
			+ '<li><span id="tam2">Nombre: </span><span id="tam">'+ item.nombre +'</span></li>'
			+ '<li><span id="tam2">C&eacute;dula: </span><span id="tam">'+ item.cedula_u +'</span></li>'
			+ '<li><span id="tam2">Direcci&oacute;n: </span><span id="tam">'+ item.direccion_u +'</span></li>'
			+ '<li><span id="tam2">Nro. Expediente: </span><span id="tam">'+ item.nro_expediente_u +'</span></li>'
			+ '<li><span id="tam2">Escuela: </span><span id="tam">'+ item.escuela_u +'</span></li>');
		});
		$('#perfilDatos').listview('refresh');
		
		var home_nav = 'home.html?user='+user;
		var cat_nav = 'catalogo.html?user='+user;
		var hist_nav = 'historial.html?user='+user;
		var res_nav = 'reserva.html?user='+user;
		var prestamos_nav = 'prestamos.html?user='+user;

		$('#home_n').attr('href',home_nav);
		$('#catalogo_n').attr('href',cat_nav);
		$('#historial_n').attr('href',hist_nav);
		$('#reservas_n').attr('href',res_nav);
		$('#prestamos_n').attr('href',prestamos_nav);
	});

	$.getJSON(serviceURL + 'getmulta2.php?user='+user, function(data) {
		$.each(data.items, function(i, item) {
			if(item.count > 0){
				$.getJSON(serviceURL + 'getmulta.php?user='+user, function(data) {
					$.each(data.items, function(i, item) {
						$('#alertasP').append('<center class="box-error">Estado: Presenta una multa de '+ item.descripcion_multa +' por la publicaci&oacute;n "'
						+ item.nombre_pub +'", dir&iacute;gase a la biblioteca para mayor informaci&oacute;n</center><p style="margin-bottom:-10px;">');
					});
				});
				}else
					{
						$('#alertasP').append('<center class="box-success">Estado: Usted no presenta ninguna multa actualmente</center>');
					}
		});
	});
}