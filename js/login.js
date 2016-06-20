$(document).ready(function(){
	ocultar();
	$("#username").focus();

		//BOTÓN LOGIN
	$("#btnLogin").click(function(){
		login();
	});
		//LLAMAR FUNCIÓN LOGIN AL PRESIONAR ENTER
	$("#login").keypress(function(event){
		if (event.which == 13) {
			login();
		}
	});
		//FUNCIÓN LOGIN
	function login(){
		var cadena = $("#login").serialize();
		usuario = $("#username").val();

		if (validar() ) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				url: "php/usuarios.php",
				data: {opc:"inicio_sesion", cadena},
				success: function(response){
					if(response.respuesta == true){
						if(response.usuario != usuario ){
							$("#errorval").dialog({
								modal: true,
					            width: 270,
					            height: 170,
					            show: {effect : "fold" ,duration: 300},
					            hide: {effect : "explode", duration: 300},
					            resizable: "false",
					            buttons: { "OK": function () { $(this).dialog("close"); } },   
					        });
						}
						window.location.href = "pages/menu.html";
					} else  if (response.fallo == true) {
						$("#error").dialog({
							modal: true,
				            width: 270,
				            height: 200,
				            show: {effect : "fold" ,duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
					}
				},
				error: function(xhr,ajaxOptions,thrownError){
					console.log(thrownError);
				}
			});		
		} else {
			$("#full").dialog({
				modal: true,
	            width: 270,
	            height: 200,
	            show: {effect : "fold" ,duration: 350},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
	}

		//FUNCIÓN VALIDAR CAMPOS
	function validar(){
		ocultar();
		var user = $("#username").val();
		var pass = $("#password").val();

		if (user == "") {
			$("#username").focus();
			$("#errornombre").show('shake',500);
			return false;
		} else if (pass == "") {
			$("#password").focus();
			$("#errorpass").show('shake',500);
			return false;
		} else {
			return true;
		}
	}
		//FUNCIÓN LIMPIAR CAMPOS
	function limpiar(){
		$("#username").val("");
		$("#password").val("");
	}
		//FUNCIÓN OCULTAR
	function ocultar(){
		$("#full").hide();
		$("#error").hide();
		$("#carEsp").hide();
		$("#errornombre").hide();
		$("#errorpass").hide();
	}
		//VALIDACIÓN NO PERMITA CARACTERES ESPECIALES
	$(".caracEsp").keypress(function(evt){

		var charCode = evt.which || evt.keyCode;
        var str = String.fromCharCode(charCode);
		var expreg = /^[a-zA-Z0-9\.\-\_]*$/;
		console.log (charCode);
		if(!str.match(expreg) && charCode != 13){
			$("#carEsp").dialog({
				modal: true,
	            width: 270,
	            height: 200,
	            show: {effect : "fold" ,duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
			return false;
		} else {
			return true;
		}
	});

});