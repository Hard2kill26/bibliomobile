var serviceURL = "http://bibliomobileteg.com/services/";

$('#reservas').live('pageshow', function(event){
res();
});

function res(){
	var user= getUrlVars()["user"];
	$('#solRes li').remove();
	$.getJSON(serviceURL + 'getreserva.php?user='+user, function(data) {
	$('#solRes').append('<li><a><span id="tam4">Solicitudes pendientes</span></a><a href="#" class="refresh" data-icon="refresh" data-theme="c" data-iconpos="notext"></a></li>');
		var num = 1;
		
		$.each(data.items, function(i, item) {
		
		var fecha = item.fecha;
		var hora = item.hora_fin;
		var mydate = new Date(fecha);
		var year = mydate.getYear();
		
		if (year < 1000)
			year+=1900;
			var day=mydate.getDay();
			var month=mydate.getMonth();
			var daym=mydate.getDate();
			
			if (daym<10)
				daym="0"+daym;
			
			var dayarray=new Array("Domingo","Lunes","Martes","Mi\u00e9rcoles","Jueves","Viernes","S\u00e1bado");
			var montharray=new Array("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
			
			var now = new Date();
			var fechhour = fecha + ' ' + hora;
			var y2k = new Date(fechhour);
			var days = (y2k - now) / 1000 / 60 / 60 / 24;
			var daysRound = Math.floor(days);
			var hours = (y2k - now) / 1000 / 60 / 60 - (24 * daysRound);
			var hoursRound = Math.floor(hours);
			var minutes = (y2k - now) / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);
			var minutesRound = Math.floor(minutes);
			var seconds = (y2k - now) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
			var secondsRound = Math.round(seconds);
			var sec = (secondsRound == 1) ? " s" : " s";
			var min = (minutesRound == 1) ? " m " : " m ";
			var hr = (hoursRound == 1) ? " h " : " h ";
			var dy = (daysRound == 1) ? " d " : " d ";
					
				if(num==1)
				{			
					$('#solRes li a.refresh').click( function() {
						res();
						marcacion = new Date();
		
						Hora_1 = marcacion.getHours();
						Minutos_1 = marcacion.getMinutes(); 
						Segundos_1 = marcacion.getSeconds(); 
						 
						if (Hora_1<=9)
						Hora_1 = "0" + Hora_1;
						 
						if (Minutos_1<=9)
						Minutos_1 = "0" + Minutos_1;
						 
						if (Segundos_1<=9)
						Segundos_1 = "0" + Segundos_1;		
						
						var gethora = Hora_1 +':'+ Minutos_1 +':'+Segundos_1;
						
							$.getJSON(serviceURL + 'actualizar_reserva.php?user='+user+'&hora='+gethora, function(data) {
							});						
						return false;			
					});	
					num++;
				}			
				
			if (daysRound == -1)
				f = 0 + hr + 0 + min + 0 + sec;
				else
				{			
					f = hoursRound + hr + minutesRound + min + secondsRound + sec;
				}
					
			$('#solRes').append('<li id="lista"><span id="tam4">'+ item.nombre_pub +'</span><p>'
					+ '<br><span id="tam3">Fecha: '+ (dayarray[day]+", "+daym+" de "+montharray[month]+" de "+year) +'</span>'
					+ '<br><span id="tam3">Tiempo de expiraci&oacute;n: <span id="tam2" style="color:#333">'+ f +'</span></span>'
					+ '<br><span id="tam3">Nro. Ejemplar: '+ item.nro_ejemplar +'</span></li>');
			
			$('#noErrors').hide();

		});
		
		if($('#solRes')){
			$('#noErrors').html('<center>No tiene reservas actualmente</center>');
			$("ul[id='solRes']").listview("refresh");
		}	
			
		$('#solRes').listview('refresh');

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
}

function res2(){
var user= getUrlVars()["user"];

$('#solRes li').remove();
marcacion2 = new Date();
Hora_2 = marcacion2.getHours();
Minutos_2 = marcacion2.getMinutes(); 
Segundos_2 = marcacion2.getSeconds(); 
						 
	if (Hora_2<=9)
		Hora_2 = "0" + Hora_2;
						 
		if (Minutos_2<=9)
			Minutos_2 = "0" + Minutos_2;
						 
			if (Segundos_2<=9)
				Segundos_2 = "0" + Segundos_2;		
						
				var gethora2 = Hora_2 +':'+ Minutos_2 +':'+Segundos_2;
						
				$.getJSON(serviceURL + 'actualizar_reserva.php?user='+user+'&hora='+gethora2, function(data) {
				});						
				
					$.getJSON(serviceURL + 'alertReserva.php?user='+user+'&hora='+gethora2, function(data) {
						$.each(data.item, function(i, item) {
						var hora_fin = item.hora_fin;
						var nombre_pub = item.nombre_pub;
							$.getJSON(serviceURL + 'getprestamoval.php?user='+user+'&id='+item.id_pub+'&ejem='+item.nro_ejemplar, function(data) {
							
								$.each(data.item, function(i, item) {
									if(item.count < 1)
									{
										$('#alertasR').append('<center class="box-success">La publicaci\u00f3n: "' + nombre_pub +'" ha expirado a las '+ hora_fin + '</center><p style="margin-bottom:-10px;">');
									}else
										{
											//$('#alertasR').html('Prestado');
										}
								});
							});
						});
					});	
				return false;
}