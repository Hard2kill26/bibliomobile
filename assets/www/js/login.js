function validar_login(){
$('#output').html('<center class="box-success">Conectando....</center>');
var serviceURL = "http://jamtechcorp.com/services/login.php";

$.post(serviceURL,{user: $('[name=username]').val()} ,
 function(usuario) {
 	if(usuario.pass_u == calcMD5($('[name=password]').val())) {
 		$('#output').html('<center class="box-success">Redireccionando...</center>');
 		setTimeout("redireccionar('home.html?user=',$('[name=username]').val())",1000);
    } else {
 		$('#output').html('<center class="box-error">No puede conectarse al servidor</center>');
    }
},'json');

actRes();

}

function redireccionar(direccion,variable){
window.location.href = direccion+variable;
}

function actRes(){
var user= $('[name=username]').val();

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
							$('#alertasR').append('<center class="box-success">La publicaci\u00f3n: "' + item.nombre_pub +'" ha expirado a las '+ item.hora_fin + '</center><p style="margin-bottom:-10px;">');
						});
					});	
				return false;
}