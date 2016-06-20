$(document).ready(function(){
	$("#nombre").focus();
	ocultar();

	$("#btnUpdate").hide();
	$("#tel").keypress(validatenum);
	$("#cel").keypress(validatenum);
		//ESTILO SELECT
	$('.chosen').chosen({
		allow_single_deselect: true,
		placeholder_text_single: "SELECCIONE",
		no_results_text: "!No Hay Resultados!"
	});
		//BOTÓN GUARDAR
	$("#btnSave").click(function(){
		if (validar() ) {
			var cadena = $("#empleado").serialize();
			guardar();
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
		//FUNCIÓN PARA GUARDAR DATOS
	function guardar(){
		$.ajax({
			cache: false,
			type: "post",
			dataType: "json",
			url: "../php/empleado.php",
			data: {opc:"guardar_empleado",cadena },
			beforeSend: function(objeto){ 
            	$('#carga').css({'display':'block'});
       		},
        	complete: function(){
        		$('#carga').css('display','none');
        	},
			success: function(response) {
				if(response.respuesta == true) {
					$("#mensajealta").append(response.nombre);
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
					$("#existe").append(response.nombre);
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
	}
	$("#btnSearch").click(function(){
		var bu = $("#id").val();
		$.ajax({
			cache: false,
			dataType: "json",
			type: "POST",
			url: "../php/empleado.php",
			data: {opc: "buscar_empleado", bu:bu},
			beforeSend: function(objeto){ 
               	$('#carga').css({'display':'block'});
       		},
        	complete: function(){
        		$('#carga').css('display','none');
        	},
			success: function(respuesta){
				if (respuesta.noexiste == true) {
					$("#noex").dialog({
						modal: true,
						width: 270,
						height: 200,
						show: {effect : "fold" ,duration: 350},
						hide: {effect : "explode", duration: 300},
						resizable: "false",
						buttons: { "OK": function () { $(this).dialog("close"); } },   
					});
				} else {
					$("#matricula").val(respuesta.id);
					$("#nombre").val(respuesta.nombre);
					$("#apaterno").val(respuesta.apaterno);
					$("#amaterno").val(respuesta.amaterno);
					$("#calle").val(respuesta.calle);
					$("#num").val(respuesta.num);
					$("#col").val(respuesta.col);
					$("#city").val(respuesta.city);
					$("#edo").val(respuesta.edo);
					$("#tel").val(respuesta.tel);
					$("#cel").val(respuesta.cel);
					$("#sueldo").val(respuesta.sueldo);
					$("#tipo").val(respuesta.tipo).attr('selected', 'selected');
					$("#btnUpdate").show();
					$("#btnSave").hide();
					$("#bu").val("");
					$('.chosen').trigger('chosen:updated');
				}
			},
			error: function(xhr,ajaxOptions,throwError){
				console.log(throwError);
			} 
		});
	});
		//AUTOCOMPLETAR BÚSQUEDA
	$("#buscar").autocomplete({
		minLength: 3,
        source: "../php/autocomplete.php?opc=empleado",
        autoFocus: true,
		select: function (event, ui) {
        	$('#id').val(ui.item.id);
            return ui.item.label;
        }
    });
			//BOTÓN VER
	$("#btnGo").click(function(){
		window.location.href = "../pages/BuscarEmpleado.html";
	});
		//BOTÓN REFRESCAR  
	$("#reset").click(function(){
		window.location.reload();
	});
		//FUNCIÓN PARA VALIDAR CAMPOS
	function validar(){
		ocultar();
		var nombre = $("#nombre").val();
		var paterno = $("#apaterno").val();
		var materno = $("#amaterno").val();
		var calle = $("#calle").val();
		var num = $("#num").val();
		var col = $("#col").val();
		var cel = $("#cel").val();
		var sueldo = $("#sueldo").val();
		var tipo = $("#tipo").val();

		if (nombre == "") {
			$("#nombre").focus();
			$("#errornombre").show();
			return false;
		} else if (paterno == "") {
			$("#apaterno").focus();
			$("#errorapaterno").show();
			return false;
		} else if (materno == "") {
			$("#amaterno").focus();
			$("#erroramaterno").show();
			return false;
		} else if (calle == "") {
			$("#calle").focus();
			$("#errorcalle").show();
			return false;
		} else if (num == "") {
			$("#num").focus();
			$("#errornum").show();
			return false;
		} else if (col == "") {
			$("#col").focus();
			$("#errorcol").show();
			return false;
		} else if (cel == "") {
			$("#cel").focus();
			$("#errorcel").show();
			return false;
		} else if (sueldo == "") {
			$("#sueldo").focus();
			$("#errorsueldo").show();
			return false;
		} else if (tipo == 0 || tipo == null) {
			$("#tipo").focus();
			$("#errortipo").show();
			return false;
		} else {
			return true;
		}
	}
		//FUNCIÓN PARA LIMPIAR LOS CAMPOS
	function limpiar(){
		$("#id").val("");
		$("#matricula").val("");
		$("#nombre").val("");
		$("#apaterno").val("");
		$("#amaterno").val("");
		$("#calle").val("");
		$("#num").val("");
		$("#col").val("");
		$("#city").val("");
		$("#edo").val("");
		$("#tel").val("");
		$("#cel").val("");
		$("#sueldo").val("");
		$("#tipo").prop('selectedIndex', 0);
		$('.chosen').trigger('chosen:updated');
	}

		//FUNCIÓN PARA OCULTAR MENSAJES
	function ocultar(){
		$("#mensajealta").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#full").hide();
		$("#noex").hide();
		$("#letras").hide();
		$("#error").hide();
		$("#errorbuscar").hide();
		$("#errornombre").hide();
		$("#errorapaterno").hide();
		$("#erroramaterno").hide();
		$("#errorcalle").hide();
		$("#errornum").hide();
		$("#errorcol").hide();
		$("#errorcel").hide();
		$("#errorsueldo").hide();
		$("#errortipo").hide();
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