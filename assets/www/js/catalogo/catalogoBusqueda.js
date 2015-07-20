function cargar_publicacion()
{
var user = getUrlVars()["user"];
var v1 = $('[name=q]').val();

var v2 = encodeURI(v1.replace( /\+/g, '%20' ).replace( /\%21/g, '!' ).replace( /\%27/g, "'" ).replace( /\%28/g, '(' ).replace( /\%29/g, ')' ).replace( /\%2A/g, '*' ).replace( /\%7E/g, '~' ).replace( /\%E1/g, 'á' ).replace( /\%E9/g, 'é' ).replace( /\%ED/g, 'í' ).replace( /\%F3/g, 'ó' ).replace( /\%FA/g, 'ú' ).replace( /\%F1/g, 'ñ' ));

	if(v2 == "")
	{
		$('#output').html('<center class="message">Ingrese un t&iacute;tulo, nombre de autor o cota para realizar la b&uacute;squeda</center>');
	}
	else
	{
		if($('[name=c]').val() == 0)
		{
			$.mobile.changePage('cargados.html?q='+v2+'&t='+$('[name=t]').val()+'&user='+user, { transition: "slideup"});
		}
		else
		{
			$.mobile.changePage('cargados.html?q='+v2+'&t='+$('[name=t]').val()+'&user='+user+'&c='+$('[name=c]').val(), { transition: "slideup"});
		}
		
	}
}