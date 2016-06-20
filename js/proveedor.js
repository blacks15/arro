$(document).ready(function(){
	$("#empresa").focus();
	$("#btnUpdate").hide();
	$("#cel").keypress(validatenum);
	ocultar();
		//BOTÓN GUARDAR
	$("#btnSave").click(function(){
		if (validar()) {
			var cadena = $("#proveedor").serialize();

			$.ajax({
				cache: false,
				type: "post",
				dataType: 'json',
				url: '../php/proveedor.php',
				data: {opc:"guardar_proveedor",cadena },
				beforeSend: function(objeto){ 
                	$('#carga').css({'display':'block'});
           		},
            	complete: function(){
            		$('#carga').css('display','none');
            	},
				success: function(response) {
					if(response.respuesta == true) {
						$("#mensajealta").dialog({
							modal: true,
				            width: 270,
				            height: 200,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();	
					} else if (response.existe == true) {
						$("#existe").dialog({
							modal: true,
				            width: 270,
				            height: 200,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
					} else if (response.fallo == true) {
						$("#error").dialog({
							modal: true,
				            width: 270,
				            height: 200,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();
					}
				},	
				error: function(xhr,ajaxOptions,throwError){
					console.log(ajaxOptions+","+throwError);
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
	});


		//BOTÓN VER
	$("#btnGo").click(function(){
		window.location.href = "../pages/BuscarProveedor.html";
	});
		//BOTÓN REFRESCAR
	$("#refresh").click(function(){
		window.location.reload();
	});
		//FUNCIÓN PARA VALIDAR CAMPOS VACIOS
	function validar(){
		ocultar();
		var empresa = $("#empresa").val();
		var cel = $("#cel").val();
		var tel = $("#tel").val();
		var lim = cel.length;
		var tlim = tel.length;

		if (empresa == "") {
			$("#empresa").focus();
			$("#errorempresa").show();
			return false;
		} else if (cel == "" && tel  == "") {
			if (clim != 10 && tlim != 7 || tlim != 10) {
				$("#tel").focus();
				$("#errorlim").show('slide',500);
				return false;
			} else {
				$("#cel").focus();
				$("#errorcel").show();
				return false;
			}
		} 
		return true;
	}
		//FUNCIÓN PARA LIMPIAR LOS CAMPOS
	function limpiar(){
		$("#matricula").val("");
		$("#empresa").val("");
		$("#contacto").val("");
		$("#calle").val("");
		$("#num").val("");
		$("#col").val("");
		$("#tel").val("");
		$("#cel").val("");
	}

		//FUNCIÓN OCULTAR
	function ocultar(){
		$("#mensajealta").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#full").hide();
		$("#letras").hide();
		$("#error").hide();
		$("#errorbuscar").hide();
		$("#errorempresa").hide();
		$("#errorcontacto").hide();
		$("#errorcel").hide();
		$("#errorlim").hide();
	}
		//CLASE PARA INPUT QUE PERMITE SOLO LETRAS
	$(".letras").keypress(function (key) {
		if ((key.charCode < 97 || key.charCode > 122) //letras mayusculas
		    && (key.charCode < 65 || key.charCode > 90) //letras minusculas
		    && (key.charCode != 45) //retroceso
		    && (key.charCode != 241) //ñ
		     && (key.charCode != 209) //Ñ
		     && (key.charCode != 32) //espacio
		     && (key.charCode != 225) //á
		     && (key.charCode != 233) //é
		     && (key.charCode != 237) //í
		     && (key.charCode != 243) //ó
		     && (key.charCode != 250) //ú
		     && (key.charCode != 193) //Á
		     && (key.charCode != 201) //É
		     && (key.charCode != 205) //Í
		     && (key.charCode != 211) //Ó
		     && (key.charCode != 218) //Ú
		    ) {
			$("#letras").dialog({
				modal: true,
			    width: 270,
			    height: 170,
			    show: {effect : "fold" ,duration: 300},
			    hide: {effect : "explode", duration: 300},
			    resizable: "false",
			    buttons: { "OK": function () { $(this).dialog("close"); } },   
			});
		    return false;
		} else {
			return true
		} 
	});
		//FUNCIÓN PARA PERMITIR SOLO NÚMEROS
	function validatenum(event) {
		var key = window.event ? event.keyCode : event.which;

		if(event.keyCode > 47 && event.keyCode < 58){
			return true;
		} else {
			$("#numeros").dialog({
				modal: true,
	            width: 270,
	            height: 200,
	            show: {effect : "fold" ,duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
        	});
			return false;
		}
	}
});