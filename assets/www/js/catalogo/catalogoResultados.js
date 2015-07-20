var serviceURL = "http://jamtechcorp.com/services/";

$('#cargarResults').live('pageshow', function(event){
validar();
});

function validar(){
	$('#results li').remove();
	$('#palabra li').remove();
	var user = getUrlVars()["user"];
	var q = getUrlVars()["q"];
	var t = getUrlVars()["t"];
	var c = getUrlVars()["c"];
	
		if(c == undefined){
			$.getJSON(serviceURL + 'getcatalogo.php?q='+ q +'&t='+ t, catOrigen);
			$('#results').html("");
		}
		else
		{
			$.getJSON(serviceURL + 'getcatalogocat.php?q='+ q +'&t='+ t +'&c='+ c, catOrigen);
			$('#results').html("");
		}
}

function catOrigen(data) {
	$('#results li').remove();
	$('#palabra li').remove();
	var user = getUrlVars()["user"];
	var q = getUrlVars()["q"];
	var t = getUrlVars()["t"];
	
		var v1 = decodeURIComponent( q.replace( /\+/g, '%20' ).replace( /\%21/g, '!' ).replace( /\%27/g, "'" ).replace( /\%28/g, '(' ).replace( /\%29/g, ')' ).replace( /\%2A/g, '*' ).replace( /\%7E/g, '~' ).replace( /\%E1/g, 'á' ).replace( /\%E9/g, 'é' ).replace( /\%ED/g, 'í' ).replace( /\%F3/g, 'ó' ).replace( /\%FA/g, 'ú' ).replace( /\%F1/g, 'ñ' ) );
		
		$('#palabra').append('<li><span id="tam4">Palabra: '+ v1 +'</span></li>');
		$.each(data.item, function(i, item) {
			if(item.tipo==1)
			{
				$('#results').append('<li><a href="catalogobusqueda.html?id='+ item.id_pub + '&user=' + user + '"><span id="tam4">'
						+ item.nombre_pub +'</span><br/><span id="tam3">'
						+ item.autor_pub +'<br/></span><span id="tam3">'				
						+ item.editorial + ', ' + item.anyo + ', ' + item.edicion +'</a></li>');
			}else 
			{
				if(item.tipo==2)
				{
					$('#results').append('<li><a href="catalogobusqueda.html?id='+ item.id_pub + '&user=' + user + '"><span id="tam4">'
						+ item.nombre_pub +'</span><br/><span id="tam3">'
						+ item.autor_pub +'<br/></span><span id="tam3">'				
						+ item.editorial + ', ' + item.anyo + '</a></li>');
				}
				else
				{
					$('#results').append('<li><a href="catalogobusqueda.html?id='+ item.id_pub + '&user=' + user +'"><span id="tam4">'
						+ item.nombre_pub +'</span><br/><span id="tam3">'
						+ item.autor_pub +'<br/></span><span id="tam3">'				
						+ item.editorial + ', ' + item.anyo + ', N&deg; ' + item.edicion + '</a></li>');
				}
			}
		});
			
		if($('#results').is(":empty")){
		$('#palabra').hide();
		$('#noresults').html('<center class="message">No se encontraron resultados</center>');
		}
		
		$('#palabra').listview('refresh');
		$('#results').listview('refresh');
}