$(document).ready(function (){

	$("#nombre").focus();
	ocultar();
	combo();
	cargar_img();
	$("#btnUpdate").hide();

	$('.chosen').chosen({
		allow_single_deselect: true,
		placeholder_text_single: "SELECCIONE",
		no_results_text: "!No Hay Resultados!"
	});

	function combo(){
		$.ajax({
			cache: false,
			type: "POST",
			datatype: "json",
			url: "../php/combo.php",
			success: function(opciones){
				$("#editorial").html(opciones.opcion_editorial);
				$("#autor").html(opciones.opcion_autor);
				$("#genero").html(opciones.opcion_genero);
				$('.chosen').trigger('chosen:updated');
			},
			error: function(xhr,ajaxOptions,throwError){
				console.log(xhr);
			} 
		});
	}
		//BOTÓN GUARDAR
	$("#btnSave").click(function() {
		guardar();
	});
		//LLAMA LA FUNCIÓN GUARDAR AL PRESIONAR ENTER
	$("#libro").keypress(function(event){
		if (event.which == 13) {
			guardar();
		}
	});

	$("#btnUpdate").click(function(){
		if (validar()) {
			var cadena = $("#form1").serialize();

			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				data: {opc:"modificar_libro",cadena },
				url: "../php/libro.php",
				success: function(response) {
					if(response.respuesta == true) {
						$("#upd").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();	
					} else if (response.fallo == true) {
						$("#nu").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
						limpiar();
					}
				},	
				error: function(xhr,ajaxOptions,throwError){
					console.log(throwError);
				} 
			});
		} else {
			$("#error").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold" ,duration: 350},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
	        });
		}
	});

 	$('#bus').click(function(){
 	 	window.location.href = "../pages/BuscarLibro.html";
 	});

	$("#btnSearch").click(function(){
		var bu = $("#bu").val();

		if (bu != ""){
			$.ajax({
				cache: false,
				dataType: "json",
				type: "POST",
				url: "../php/libro.php",
				data: {opc: "buscar_libro", bu:bu},
				success: function(respuesta){
					if (respuesta.noexiste == true) {
						$("#errornoex").dialog({
							modal: true,
				            width: 270,
				            height: 170,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { $(this).dialog("close"); } },   
				        });
					} else {
						$("#codigo").val(respuesta.id);
						$("#nombre").val(respuesta.nombre);
						$("#isbn").val(respuesta.id);
						$("#autor").val(respuesta.autor).attr('selected', 'selected');
						$("#editorial").val(respuesta.editorial).attr('selected', 'selected');
						$("#btnUpdate").show();
						$("#btnsave").hide();
						$("#bu").val("");
						$('.chosen').trigger('chosen:updated');
					}
				},
				error: function(xhr,ajaxOptions,throwError){
					console.log(throwError);
				} 
			});
		}

	});
		//FUNCIÓN GUARDAR 
	function guardar(){
		var cadena = $("#libro").serialize();
		if (validar()) {
			$.ajax({
				cache: false,
				type: "POST",
				datatype: "json",
				data: {opc:"guardar_libro",cadena },
				url: "../php/libro.php",
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
					console.log(throwError);
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
		//BOTÓN REINICIAR
	$("#reset").click(function(){
		$("#btnsave").show();
		$("#btnUpdate").hide();
		$('.chosen').trigger('chosen:updated');
	});
	    //FUNCIÓN CARGAR IMAGEN
    function cargar_img(){
    	var img = $("#imagen").val();
    	if (img == "") {
    		$("#imagen").fileinput({
				previewFileType: "image",
				showCaption: false,
				showUpload: false,
				showRemove: false,
				showClose: false,
		        initialPreview: [
	            '<img src=../images/no_image.png class="file-preview-image">',
	        	],
			});
    	} else {
		   $("#imagen").fileinput({
		        showCaption: false,
		        showUpload: false,
		        previewFileType: "image",
		        allowedFileExtensions: ["jpg","png"],
		        elErrorContainer: "#errorBlock",
		        browseClass: "btn btn-primary",
		        browseLabel: "",
		        browseIcon: "<i class=\"fa fa-image\"></i> ",
		        removeClass: "btn btn-danger",
		        removeLabel: "",
		        removeIcon: "<i class=\"fa fa-trash\"></i> ",
		        initialPreview: [
	            '<img src="../images/'+nombre+'.jpg" class="file-preview-image">',
	        	],
		    });
    	}
    }

		//FUNCIÓN PARA VALIDAR CAMPOS
	function validar(){
		ocultar();
		var name = $("#nombre").val();
		var isbn = $("#isbn").val();
		var autor = $("#autor").val();
		var editorial = $("#editorial").val();
		if (name == "") {
			$("#nombre").focus();
			$("#errornombre").show();
			return false;
		} else if (isbn == "") {
			$("#isbn").focus();
			$("#errorisbn").show();
			return false;
		} else if (autor == null || autor == 0) {
			$("#autor").focus();
			$("#errorautor").show();
			return false;
		} else if (editorial == 0 || editorial == null) {
			$("#editorial").focus();
			$("#erroreditorial").show();
			return false;
		} 
		return true;
	}
		//FUNCIÓN OCULTAR MENSAJES DE ERROR
	function ocultar(){
		$("#errorbuscar").hide();
		$("#errornombre").hide();
		$("#errorisbn").hide();
		$("#errorgenero").hide();
		$("#errorautor").hide();
		$("#erroreditorial").hide();
		$("#error").hide();
		$("#mensajealta").hide();
		$("#numeros").hide();
		$("#mensajealta").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#full").hide();
		$("#error").hide();
	}
		//FUNCIPON PARA LIMPIAR LOS CAMPOS
	function limpiar(){
		$("#codigo").val("");
		$("#nombre").val("");
		$("#isbn").val("");
		$("#genero").prop('selectedIndex', 0);
		$("#autor").prop('selectedIndex', 0);
		$("#editorial").prop('selectedIndex', 0);
		$('.chosen').trigger('chosen:updated');
	}
});