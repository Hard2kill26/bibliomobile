var serviceURL = "http://jamtechcorp.com/services/";

$('#prestamos').live('pageshow', function(event){
pres();
});

function pres(){
	var user= getUrlVars()["user"];
	$('#solPres li').remove();
	$.getJSON(serviceURL + 'getprestamo.php?user='+user, function(data) {
	$('#solPres').append('<li><span id="tam4">Pr&eacute;stamos actuales</span></li>');
		
		$.each(data.items, function(i, item) {
		
		marcacion3 = new Date();
		Hora_3 = marcacion3.getHours();
		Minutos_3 = marcacion3.getMinutes(); 
		Segundos_3 = marcacion3.getSeconds(); 
							 
		if (Hora_3<=9)
			Hora_3 = "0" + Hora_3;
							 
			if (Minutos_3<=9)
				Minutos_3 = "0" + Minutos_3;
							 
				if (Segundos_3<=9)
					Segundos_3 = "0" + Segundos_3;		
							
					var gethora3 = Hora_3 +':'+ Minutos_3 +':'+Segundos_3;
		
		var fecha1 = item.fecha1;
		var fecha2 = item.fecha2;
		var hora = gethora3;
		var mydate = new Date(fecha1);
		var mydate2 = new Date(fecha2);
		var year = mydate.getYear();
		
		if (year < 1000)
			year+=1900;
			var day=mydate.getDay();
			var month=mydate.getMonth();
			var daym=mydate.getDate();

			var day2=mydate2.getDay();
			var month2=mydate2.getMonth();
			var daym2=mydate2.getDate();
			
			if (daym<10)
				daym="0"+daym;
				
			if (daym2<10)
				daym2="0"+daym2;
			
			var dayarray=new Array("Domingo","Lunes","Martes","Mi\u00e9rcoles","Jueves","Viernes","S\u00e1bado");
			var montharray=new Array("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
					
			$('#solPres').append('<li id="lista"><span id="tam4">'+ item.nombre_pub +'</span><p>'
					+ '<br><span id="tam3">Fecha de entrega: '+ (dayarray[day]+", "+daym+" de "+montharray[month]+" de "+year) +'</span>'
					+ '<br><span id="tam3">Fecha de devoluci&oacute;n: '+ (dayarray[day2]+", "+daym2+" de "+montharray[month2]+" de "+year) +'</span>'
					
					+ '<br><span id="tam3">Nro. Ejemplar: '+ item.nro_ejemplar +'</span></li>');
			
			$('#noErrors').hide();

		});
		
		if($('#solPres')){
			$('#noErrors').html('<center>No posee pr&eacute;stamos actualmente</center>');
			$("ul[id='solPres']").listview("refresh");
		}	
			
		$('#solPres').listview('refresh');

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