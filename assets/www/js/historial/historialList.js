var serviceURL = "http://jamtechcorp.com/services/";

$('#historial').live('pageshow', function(event){
lista();
});

function lista(){
	var user= getUrlVars()["user"];
	$('#dataList li').remove();
	$.getJSON(serviceURL + 'gethistorial.php?user='+user, function(data) {
	$('#dataList').append('<li data-role="list-divider">Favoritos</li>');
		$.each(data.items, function(i, item) {
		
		var fecha = item.fecha_historial;
		var fecha2 = fecha.replace(/-/gi,'/');
		var mydate = new Date(fecha2);
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
					
			$('#dataList').append('<li><a href="catalogohistorial.html?id='+ item.id_pub + '&user='+ user +'"><span id="tam5">'
					+ (dayarray[day]+", "+daym+" de "+montharray[month]+" de "+year) +'</span><br/><span id="tam2">'
					+ item.nombre_pub +'</span><br/><span id="tam5">'				
					+ item.cota_pub +'</span></a><a href="#" class="close" data-icon="delete" data-theme="c"></a></li>');
					
			$('#dataList li a.close').click( function() {
				$(this).parent().slideUp('normal', function(){
				var res = item.id_pub;
				
					$.getJSON(serviceURL + 'actualizar_hist.php?id='+res+'&user='+user, function(data) {
						//alert(res);
					});
						$(this).remove();
						$("ul[id='dataList']").listview("refresh");
				});
				return false;
			});
			
			$('#noErrors').hide();
		});
		
		if($('#dataList')){
			$('#noErrors').html('<center>No tiene publicaciones guardadas</center>');
			$("ul[id='dataList']").listview("refresh");
		}	
			
		$('#dataList').listview('refresh');
		
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