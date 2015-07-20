$('#catalogoPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	var user = getUrlVars()["user"];
	$.getJSON(serviceURL + 'getcatalogo2.php?id='+ id + '&user=' + user , displaycatalogo);
	
	$("#guardar").click(function(event){
		$.getJSON(serviceURL + 'insertar_actualizar_hist.php?id='+ id + '&user=' + user , mostrar_mensaje);
		event.preventDefault();
	});
	
	$("#reservar").click(function(event){
		var agree = confirm('\u00bfEst\u00e1 seguro que desea reservar este material?');
			if (agree) {
				$.getJSON(serviceURL + 'reservar.php?id='+ id + '&user=' + user , mostrar_mensaje2);}
			else {
				return false;}
		event.preventDefault();
	});
	
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

function displaycatalogo(data) {
	var item = data.items;
	$('#catalogoList li').remove();
	
	$('#catalogoList').append('<li id="tam"> ' + item.nombre_pub + '</li>');
	
	if(item.tipo==1)
		{	
			$('#info').append('<li data-role="list-divider">Informaci&oacute;n</li>'
					+ '<li><span id="tam2">Autor: </span><span id="tam">' 
					+ item.autor_pub + '</span></li><li><a href="http://books.google.com/books?vid=ISBN'+ item.isbn_pub +'"><span id="tam2">ISBN: </span></span><span id="tam">'
					+ item.isbn_pub + '</a></span></li><li><span id="tam2">Idioma: </span></span><span id="tam">'
					+ item.idioma_pub + '</span></li><li><span id="tam2">Cota: </span></span><span id="tam">'
					+ item.cota_pub + '</span></li><li><span id="tam2">Nro. P&aacute;ginas: </span></span><span id="tam">'
					+ item.paginas + ' ' + 'p.' + '</span></li><li><span id="tam2">Editorial: </span></span><span id="tam">'
					+ item.editorial + '</span></li><li><span id="tam2">Edici&oacute;n: </span></span><span id="tam">'
					+ item.edicion + '</li>');
					
			$('#disponibilidad').append('<li data-role="list-divider">Disponibilidad</li>' 
							+ '<li><span id="tam2">Ejemplares: </span></span><span id="tam">'
							+ item.ejemplares + '</span></li>');
		}else
		{
			if(item.tipo==2)
				{
					$('#info').append('<li data-role="list-divider">Informaci&oacute;n</li>'
							+ '<li><span id="tam2">Autor: </span><span id="tam">' 
							+ item.autor_pub + '</span></li><li><span id="tam2">Carrera: </span></span><span id="tam">'
							+ item.isbn_pub + '</span></li><li><span id="tam2">Idioma: </span></span><span id="tam">'
							+ item.idioma_pub + '</span></li><li><span id="tam2">Cota: </span></span><span id="tam">'
							+ item.cota_pub + '</span></li><li><span id="tam2">Nro. P&aacute;ginas: </span></span><span id="tam">'
							+ item.paginas + ' ' + 'p.' + '</span></li><li><span id="tam2">Direcci&oacute;n: </span></span><span id="tam">'
							+ item.editorial + '</span></li><li><span id="tam2">A&ntilde;o: </span></span><span id="tam">'
							+ item.edicion + '</li>');
					
					$('#disponibilidad').append('<li data-role="list-divider">Disponibilidad</li>' 
									+ '<li><span id="tam2">Ejemplares: </span></span><span id="tam">'
									+ item.ejemplares + '</span></li>');
				}else
				{
					$('#info').append('<li data-role="list-divider">Informaci&oacute;n</li>'
							+ '<li><span id="tam2">A&ntilde;o: </span><span id="tam">' 
							+ item.autor_pub + '</span></li><li><span id="tam2">ISSN: </span></span><span id="tam">'
							+ item.isbn_pub + '</span></li><li><span id="tam2">Idioma: </span></span><span id="tam">'
							+ item.idioma_pub + '</span></li><li><span id="tam2">Cota: </span></span><span id="tam">'
							+ item.cota_pub + '</span></li><li><span id="tam2">Nro. P&aacute;ginas: </span></span><span id="tam">'
							+ item.paginas + ' ' + 'p.' + '</span></li><li><span id="tam2">Editorial: </span></span><span id="tam">'
							+ item.editorial + '</span></li><li><span id="tam2">Edici&oacute;n: </span></span><span id="tam"> N&deg; '
							+ item.edicion + '</li>');
					
					$('#disponibilidad').append('<li data-role="list-divider">Disponibilidad</li>' 
									+ '<li><span id="tam2">Ejemplares: </span></span><span id="tam">'
									+ item.ejemplares + '</span></li>');
									
				}
		}
		
		$('#reservar').append('<input type="button" data-theme="e" data-icon="plus" value="Reservar"/></div>');
		$('#guardar').append('<input type="button" data-theme="d" data-icon="star" value="Guardar"/></div>');

		$('#catalogoList').listview('refresh');
		$('#info').listview('refresh');
		$('#disponibilidad').listview('refresh');
		$("[type='button']").button();
}

function mostrar_mensaje(){
	alert('La publicaci\u00f3n ha sido agregada exitosamente');
}
function mostrar_mensaje2(data){
	var tmp = data.item;
	
	$.each(tmp, function(i, item) {
		if (item.reservar == 1)
		{
			alert('La publicaci\u00f3n fue reservada exitosamente, dispone de dos (2) horas para retirarlo');
		}else
		{
			if (item.reservar == 2)
			{
				alert('Usted ya posee una reserva actualmente de esta publicaci\u00f3n');
			}else
			{
				if (item.reservar == 3)
				{
					alert('La publicaci\u00f3n no se pudo reservar, solo est\u00e1 disponible como material de sala');
				}else
				{
					if (item.reservar == 4)
					{
						alert('Usted ya tiene dos (2) pr\u00e9stamos actualmente');
					}else
					{
						if (item.reservar == 5)
						{
							alert('Las reservas s\u00f3lo est\u00e1n disponibles de 7:00 a.m hasta las 9:50 p.m');
						}else
							{
								alert('Usted presenta una multa por morosidad, ac\u00e9rquese a la biblioteca para mayor informaci\u00f3n');
							}
					}
				}
			}
		}	
	});
}