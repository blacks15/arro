$(document).ready(function(){
	$("#nombre").focus();
	$("#btnUpdate").hide();
	ocultar();
	combo();

		//LLAMAR FUNCIÓN LOGIN AL PRESIONAR ENTER
	$("#producto").keypress(function(event){
		if (event.which == 13) {
			guardar();
		}
	});
		//BOTÓN GUARDAR
	$("#btnSave").click(function(){
		guardar();
	});
		//FUNCIÓN GUARDAR DATOSS
	function guardar(){
		if (validar()) {
			var cadena = $("#producto").serialize(); 
			$.ajax({
				cache: false,
				type: "post",
				dataType: 'json',
				url: '../php/producto.php',
				data: {opc:"guardar_producto",cadena },
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
						$("#error").append(response.nombre);
						$("#error").dialog({
							modal: true,
				            width: 270,
				            height: 200,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { 
				            	window.location.reload();
				            } },   
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
	}
			//LLENAR COMBO USANDO CHOSEN
	$('.chosen').chosen({
		allow_single_deselect: true,
		placeholder_text_single: "SELECCIONE",
		no_results_text: "!No Hay Resultados!"
	});
			//BOTÓN VER
	$("#btnGo").click(function(){
		window.location.href = "../pages/BuscarProducto.html";
	});
		//BOTÓN REFRESCAR  
	$("#reset").click(function(){
		window.location.reload();
	});
		//BOTÓN SALIDA	
	$("#btnOut").click(function(){
		window.location.href = "../pages/SalidaProducto.html";
	});

	function validar(){
		ocultar();
		var prov = $("#prov").val();
		var nombre = $("#nombre").val();
		var cant = $("#cant").val();
		var compra = $("#compra").val();
		var venta = $("#venta").val();
		var minima = $("#minima").val();

		if (nombre == 0 || nombre == null) {
			$("#nombre").focus();
			$("#errornombre").show();
			return false;
		} else if (prov == 0 || prov == null ) {
			$("#prov").focus();
			$("#errorprov").show();
			return false
		} else if (cant == "" || cant == 0) {
			$("#cant").focus();
			$("#errorprecio").hide();
			return false;
		} else if (minima == "" || minima == 0) {
			$("#minima").focus();
			$("#errorcm").show();
			return false;
		} else if (compra == "" || compra == 0){
			$("#compra").focus();
			$("#errorcompra").show();
			return false;
		} else if (venta == "" || venta == 0) {
			$("#venta").focus();
			$("#errorVenta").show();
			return false; 
		}
		return true;
	}

		//FUNCIÓN LLENAR SELECT
	function combo(){
		$.ajax({
			cache: false,
			type: "POST",
			dataType: "json",
			url: "../php/combo.php?opc=proveedor",
			success: function(opciones){
				$("#prov").html(opciones.opcion_proveedor);
				$('.chosen').trigger('chosen:updated');
			},
			error: function(xhr,ajaxOptions,throwError){
				console.log(xhr);
			} 
		});
	}

		//FUNCIÓN PARA LIMPIAR LOS CAMPOS
	function limpiar(){
		$("#buscar").val("");
		$("#id").val("");
		$("#nombre").val("");
		$("#compra").val("");
		$("#minima").val("");
		$("#venta").val("");
		$("#cant").val("");
		$("#status").val("");
		$("#prov").prop('selectedIndex', 0);
		$('.chosen').trigger('chosen:updated');
	}

		//FUNCIÓN PARA OCULTAR
	function ocultar(){
		$("#mensajealta").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#full").hide();
		$("#letras").hide();
		$("#error").hide();
		$("#errorbuscar").hide();
		$("#errornombre").hide();
		$("#errorprov").hide();
		$("#errorcm").hide();
		$("#errorcant").hide();
		$("#errorprecio").hide();
		$("#errorVenta").hide();
		$("#letras").hide();
		$("#numeros").hide();
	}
		//FUNCIÓN PARA ACEPTAR SOLO LETRAS 
	$(".letras").keypress(function(evt){

		var charCode = evt.which || evt.keyCode;
        var str = String.fromCharCode(charCode);
		var expreg = /^[a-zA-Z\s]*$/;

		if(!str.match(expreg) && charCode != 13){
			$("#letras").dialog({
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
		//FUNCIÓN PARA ACEPTAR SOLO NÚMEROS 
	$(".numeros").keypress(function(evt){

		var charCode = evt.which || evt.keyCode;
        var str = String.fromCharCode(charCode);
		var expreg = /^[0-9]*$/;

		if(!str.match(expreg) && charCode != 13){
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
		} else {
			return true;
		}
	});

});