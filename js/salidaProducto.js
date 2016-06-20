$(document).ready(function(){
	ocultar();
	$("#nombre").focus();
	$("#btnUpdate").hide();

	$("#btnSave").click(function() {
		if (validar() ) {
			var cadena = $("#sp").serialize();
			$.ajax({
				cache: false,
				dataType: "json",
	            type: "POST",
	            url: "../php/producto.php",
	            data: {opc:"salida_producto",cadena },
	            beforeSend: function(objeto){ 
               		$('#carga').css({'display':'block'});
	       		},
	        	complete: function(){
	        		$('#carga').css('display','none');
	        	},
	            success: function(respuesta){
					if (respuesta.respuesta == true) {
						$("#mensajealta").dialog({
							modal: true,
							width: 270,
							height: 200,
							show: {effect : "fold" ,duration: 350},
							hide: {effect : "explode", duration: 300},
							resizable: "false",
							buttons: { "OK": function () { $(this).dialog("close");} },   
						});
						limpiar();
					} if (respuesta.insuf == true) {
						$("#insuf").dialog({
							modal: true,
							width: 270,
							height: 200,
							show: {effect : "fold" ,duration: 350},
							hide: {effect : "explode", duration: 300},
							resizable: "false",
							buttons: { "OK": function () {
								$(this).dialog("close");
								$("#nombre").focus();} 
							},   
						});
					} if (respuesta.fallo == true) {
						$("#error").dialog({
							modal: true,
							width: 270,
							height: 200,
							show: {effect : "fold" ,duration: 350},
							hide: {effect : "explode", duration: 300},
							resizable: "false",
							buttons: { "OK": function () { $(this).dialog("close");} },   
						});
					}
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
				buttons: { "OK": function () {$(this).dialog("close"); } },   
			});
		}
	});

		//TRAER EXISTENCIA DESPÚES DE QUITAR EL FOCUS
	$("#nombre").focusout(function(){
		var name = $("#nombre").val();
		if (name != "") {
			$.ajax({
				cache: false,
				dataType: "json",
	            type: "POST",
	            url: "../php/autocomplete.php?opc=producto_existencia",
	            data: {name:name},
	            beforeSend: function(objeto){ 
               		$('#carga').css({'display':'block'});
	       		},
	        	complete: function(){
	        		$('#carga').css('display','none');
	        	},
	            success: function(respuesta){
					if (respuesta.existencia == 0) {
						$("#agotado").dialog({
							modal: true,
							width: 270,
							height: 200,
							show: {effect : "fold" ,duration: 350},
							hide: {effect : "explode", duration: 300},
							resizable: "false",
							buttons: { "OK": function () { 
								$(this).dialog("close"); 
								$("#nombre").focus();} 
							},   
						});
						limpiar();
					} else {
						$('#exist').val(respuesta.existencia);
						$("#um").val(respuesta.um);
					}
	            }
	        });
		}
	});
		//AAUTOCOMPLETAR BÚSQUEDA
	$("#nombre").autocomplete({
		minLength: 2,
        source: "../php/autocomplete.php?opc=producto",
        autoFocus: true,
		select: function (event, ui) {
        	$('#codigo').val(ui.item.id);
            return ui.item.label;
        }
    });
    	//BOTÓN Ingresar Nuevo  
	$("#btnNew").click(function(){
		window.location.href = "../pages/CrearProducto.html";
	});
    	//BOTÓN BUSCAR PRODUCTOS
	$("#btnGo").click(function(){
		window.location.href = "../pages/BuscarProducto.html";
	});
		//BOTÓN REFRESCAR  
	$("#reset").click(function(){
		window.location.reload();
	});
		//FUNCIÓN VALIDAR
	function validar(){
		ocultar();
		var nombre = $("#nombre").val();
		var salida = $("#salida").val();

		if (nombre == "") {
			$("#nombre").focus();
			$("#errornombre").show();
			return false;
		} else if (salida == "" || salida == 0) {
			$("#salida").focus();
			$("#errorsalida").show();
			return false;
		} else {
			return true;
		}
	}

		//FUNCIPON LIMPIAR
	function limpiar(){
		$("#codigo").val("");
		$("#nombre").val("");
		$("#exist").val("");
		$("#um").val("");
		$("#salida").val("");
		$("#nombre").focus();
	}

		//FUNCIÓN OCULTAR
	function ocultar(){
		$("#mensajealta").hide();
		$("#upd").hide();
		$("#insuf").hide();
		$("#agotado").hide();
		$("#full").hide();
		$("#noex").hide();
		$("#error").hide();
		$("#errornombre").hide();
		$("#errorsalida").hide();
	}
});