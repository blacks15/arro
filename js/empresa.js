$(document).ready(function() {
	$("#nombre").focus();
	$("#btnUpdate").hide();
	ocultar();
	var fileExtension = "";
	$("#tel").keypress(validatenum);
	$("#cel").keypress(validatenum);

	if (window.location.pathname != '/arro/pages/CrearEmpresa.html') {
		empresa();
	} else {
		var nombre = sessionStorage.getItem('nombre');
		if (nombre == null) {
			$("#imagen").fileinput({
				showCaption: false,
				showUpload: false,
				previewFileType: "image",
				allowedFileExtensions: ["jpg"],
				elErrorContainer: "#errorBlock",
		        browseClass: "btn btn-success",
		        browseLabel: "",
		        browseIcon: "<i class=\"fa fa-image\"></i> ",
		        removeClass: "btn btn-danger",
		        removeLabel: "",
		        removeIcon: "<i class=\"fa fa-trash\"></i> ",
			});
		} else {
			nombre = nombre.replace(/\s+/g, '');
			$("#imagen").fileinput({
				showCaption: false,
				showUpload: false,
				previewFileType: "image",
				allowedFileExtensions: ["jpg"],
				elErrorContainer: "#errorBlock",
		        browseClass: "btn btn-success",
		        browseLabel: "",
		        browseIcon: "<i class=\"fa fa-image\"></i> ",
		        removeClass: "btn btn-danger",
		        removeLabel: "",
		        removeIcon: "<i class=\"fa fa-trash\"></i> ",
		        initialPreview: [
	            '<img src="../images/'+nombre+'.jpg" class="file-preview-image">',
	        	],
			});
				//EJECUTAR FUNCIÓN ACTUALIZAR
			update();	
		}	
	}
		//FUNCIÓN PARA VERIFICAR SI HAY UNA EMPRESA DADA DE ALTA
	function empresa(){
		$.ajax({
			cache: false,
            url: '../php/empresa.php',
            dataType: 'json',
            type: "POST",
            data: {opc:"verificar_empresa"},
			beforeSend: function(objeto){ 
            	$('#carga').css({'display':'block'});
       		},
        	complete: function(){
        		$('#carga').css('display','none');
        	},
            success: function(response) {
                if (response.nueva == true) {
                	if (window.location.pathname != '/arro/pages/CrearEmpresa.html') {
						$("#mensajealta").append('Presionar Añadir Para Registrar Empresa');
						$("#mensajealta").dialog({
							closeOnEscape: false,
							open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
							modal: true,
				            width: 370,
				            height: 220,
				            show: {effect : "fold", duration: 300},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "Añadir": function () {
				            	window.location.href = "../pages/CrearEmpresa.html";
				            } },   
				        });
					}
                } else {
                		//LLENAMOS LOS CAMPOS CON LOS VALORES RETORNADOS
					$("#nombre").val(response.nombre);
					$("#rfc").val(response.rfc);
					$("#domicilio").val(response.domicilio);
					$("#city").val(response.city);
					$("#edo").val(response.edo);
					$("#tel").val(response.tel);
					$("#cel").val(response.cel);
					$("#email").val(response.email);
					$("#web").val(response.web);
						//ELIMINAMOS ESPACIO DEL NOMBRE
					response.nombre = response.nombre.replace(/\s+/g, '');
						//VALIDAR SI LA IMAGEN NO ESTA VACIA O NO SE ENCUENTRA
					if ($("#imagen").val() == "") {
							//MOSTRAR IMAGEN 
						$("#imagen").fileinput({
							previewFileType: "image",
							showCaption: false,
							showUpload: false,
							showRemove: false,
							showClose: false,
							overwriteInitial: false,
					        initialPreview: [
				            '<img src=../images/no_image.png class="file-preview-image">',
				        	],
						});
					} else {
							//MOSTRAR IMAGEN 
						$("#imagen").fileinput({
							previewFileType: "image",
							showCaption: false,
							showClose: false,
							showUpload: false,
							showRemove: false,
							overwriteInitial: false,
					        initialPreview: [
				            '<img src="../images/'+response.nombre+'.jpg" class="file-preview-image">',
				        	],
						});
					}
						//DESHABILITAR BOTÓN BROWSE
					$("#imagen").fileinput("disable");
						//SINO ES ADMINISTRADOR SE BLOQUEAN LOS BOTONES
					if (response.tipo == 'administrador') {
						$("#btnDatos").attr("disabled", "disabled");
						$("#btnDelete").attr("disabled", "disabled");
					}
                }
            }
        });
	}
		//FUNCIÓN UPDATE
	function update() {
		var nombre = sessionStorage.getItem('nombre');
		//nombre = nombre.replace(/\s+/g, '');
			//LLENAMOS LOS DATOS CON LA SESSION PARA SER ACTUALIZADOS
		$("#nombre").val(sessionStorage.getItem('nombre'));
		$("#rfc").val(sessionStorage.getItem('rfc'));
		$("#tel").val(sessionStorage.getItem('tel'));
		$("#cel").val(sessionStorage.getItem('cel'));
		$("#email").val(sessionStorage.getItem('email'));
		$("#web").val(sessionStorage.getItem('web'));
		$("#city").val(sessionStorage.getItem('city'));
		$("#edo").val(sessionStorage.getItem('edo'));
			//OCULTAMOS BOTON GUARDAR Y MOSTRAMOS MODIFICAR
		$("#btnUpdate").show();
		$("#btnSave").hide();
			//VACIAMOS LA SESSION
		sessionStorage.clear();
	}
		//FUNCIÓN SUBIR IMAGEN
	function subirimagen(){
		var name = $("#nombre").val();
		var status;
        var name = name.replace( /\s/g, ""); 
		var inputFileImage = document.getElementById('imagen');
		var file = inputFileImage.files[0];
		var data = new FormData();
		data.append('archivo',file);
		data.append('name',name);

		$.ajax({
			cache: false,
            url: '../php/img.php',
            dataType: 'json',
            type: "POST",
            data: data,
            contentType: false,
            processData: false,
            success: function(datos) {
                if (datos.respuesta == true) {
                	status = true;
                } else {
                	status = false;
                }
            }
        });
        return true;
	}

		//BOTÓN GUARDAR
	$("#btnSave").click(function() {
		guardar();
	});
		//LLAMA LA FUNCIÓN GUARDAR AL PRESIONAR ENTER
	$("#empresa").keypress(function(event){
		if (event.which == 13) {
			guardar();
		}
	});
		//FUNCIÓN GUARDAR
	function guardar(){
		var cadena = $("#empresa").serialize();
		
		if (validar() ) {
			$.ajax({
				cache: false,
				type: "post",
				dataType: 'json',
				url: '../php/empresa.php',
				data: {opc:"guardar_empresa",cadena },
				beforeSend: function(objeto){ 
                	$('#carga').css({'display':'block'});
           		},
            	complete: function(){
            		$('#carga').css('display','none');
            	},
				success: function(response) {
					if(response.respuesta == true) {
						if (subirimagen() == true) {
							$("#mensajealta").dialog({
								closeOnEscape: false,
								open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
								modal: true,
					            width: 270,
					            height: 200,
					            show: {effect : "fold" ,duration: 350},
					            hide: {effect : "explode", duration: 300},
					            resizable: "false",
					            buttons: { "OK": function () {
					            	window.location.href = "Empresa.html";
					            }},   
					        });
							limpiar();	
						}
					} else if (response.existe == true) {
						$("#existe").dialog({
							closeOnEscape: false,
							open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
							modal: true,
				            width: 270,
				            height: 200,
				            show: {effect : "fold" ,duration: 350},
				            hide: {effect : "explode", duration: 300},
				            resizable: "false",
				            buttons: { "OK": function () { 
				            	window.location.href = "Empresa.html";
				            } },   
				        });
					} else if (response.fallo == true) {
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
			//BOTÓN ACUTALIZAR
	$("#btnUpdate").click(function() {
		var cadena = $("#empresa").serialize();
		
		if (validar() ) {
			$.ajax({
				cache: false,
				type: "post",
				dataType: 'json',
				url: '../php/empresa.php',
				data: {opc:"modificar_empresa",cadena },
				beforeSend: function(objeto){ 
                	$('#carga').css({'display':'block'});
           		},
            	complete: function(){
            		$('#carga').css('display','none');
            	},
				success: function(response) {
					if(response.respuesta == true) {
						if (subirimagen() == true) {
							$("#upd").dialog({
								closeOnEscape: false,
								open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
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
					} else if (response.fallo == true) {
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
	});
		//BOTÓN VENTA
	$("#btnVenta").click(function() {
		window.location.href = "CrearVenta.html";
	});
		//BOTÓN ACTUALIZAR DATOS
	$("#btnDatos").click(function() {
			//LLAMOS LA FUNCIÓN SESION Y REDIRIGIMOS A LA PÁGINA
		sesion();
		window.location.href = "CrearEmpresa.html";
	});
		//BOTÓN ELIMINAR EMPRESA
	$("#btnDelete").click(function() {});
		//BOTÓN REFRESCAR
	$("#refresh").click(function() {
		window.location.reload();
	});
		//LLENAMOS LA SESION CON LOS DATOS
	function sesion(){
		var nombre = $("#nombre").val();
		var rfc = $("#rfc").val();
		var tel = $("#tel").val();
		var cel = $("#cel").val();
		var email = $("#email").val();
		var city = $("#city").val();
		var edo = $("#edo").val();
			//LLENAMOS LAS VARIABLES DE SESION CON LOS DATOS
		sessionStorage.setItem("nombre",nombre);
		sessionStorage.setItem("rfc",rfc);
		sessionStorage.setItem("tel",tel);
		sessionStorage.setItem("cel",cel);
		sessionStorage.setItem("email",email);
		sessionStorage.setItem("city",city);
		sessionStorage.setItem("edo",edo);
	}
		//FUNCIÓN VALIDAR CAMPOS
	function validar(){
		ocultar();
		var nombre = $("#nombre").val();
		var rfc = $("#rfc").val();
		var tel = $("#tel").val();
		var cel = $("#cel").val();
		var email = $("#email").val();
		var calle = $("#calle").val();
		var num = $("#num").val();
		var col = $("#col").val();
		var city = $("#city").val();
		var edo = $("#edo").val();
		var clim = cel.length;
		var tlim = tel.length;

		if (nombre == "") {
			$("#nombre").focus();
			$("#errornombre").show('slide',500);
			return false;
		} else if (validaRfc(rfc) == false) {
			$("#rfc").focus();
			$("#errorrfcn").show('slide',500);
			return false;
		} else if (rfc == "") {
			$("#rfc").focus();
			$("#errorrfc").show('slide',500);
			return false;
		} else if (tel == "" && cel == "") {
			if (clim != 10) {
				$("#tel").focus();
				$("#errorlim").show('slide',500);
				return false;
			} else {
				$("#tel").focus();
				$("#errortel").show('slide',500);
				return false;
			}
		} else if (email == "" || validarEmail(email) == false) {
			$("#email").focus();
			return false;
		} else if (calle == "") {
			$("#calle").focus();
			$("#errorcalle").show('slide',500);
			return false;
		} else if (num == "" || num.length < 4) {
			$("#num").focus();
			$("#errornum").show('slide',500);
			return false;
		} else if (col == "") {
			$("#col").focus();
			$("#errorcol").show('slide',500);
			return false;
		} else if (city == "") {
			$("#city").focus();
			$("#errorcity").show('slide',500);
			return false;
		} else if (edo == "") {
			$("#edo").focus();
			$("#erroredo").show('slide',500);
			return false;
		} else {
			return true;
		}
	}
		//FUNCIÓN VALIDAR RFC DE 12 O 13 DIGITOS
	function validaRfc(rfcStr) {
		var strCorrecta;
		strCorrecta = rfcStr;	

		if (rfcStr.length == 12){
			var valid = '^(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
		} else {
			var valid = '^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
		}

		var validRfc = new RegExp(valid);
		var matchArray = strCorrecta.match(validRfc);

		if (matchArray == null) {
			return false;
		} else {
			return true;
		}
	}
		//FUNCIÓN PARA VALIDAR E-MAILS
	function validarEmail( email ) {
		expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if ( !expr.test(email) ){
			return false;
		} else {
			return true;
		}
	}
		//FUNCIÓN LIMPIAR
	function limpiar(){
		$("#nombre").val("");
		$("#rfc").val("");
		$("#tel").val("");
		$("#cel").val("");
		$("#email").val("");
		$("#web").val("");
		$("#calle").val("");
		$("#num").val("");
		$("#col").val("");
		$("#city").val("");
		$("#edo").val("");
	}
		//FUNCIÓN OCULTAR
	function ocultar(){
		$("#mensajealta").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#full").hide();
		$("#error").hide();
		$("#errornombre").hide();
		$("#errorrfc").hide();
		$("#errorrfcn").hide("slide",500);
		$("#errortel").hide();
		$("#errorlim").hide();
		$("#errorcel").hide();
		$("#erroremail").hide();
		$("#errorcalle").hide();
		$("#errornum").hide();
		$("#errorcol").hide();
		$("#errorcity").hide();
		$("#erroredo").hide();
	}
		//FUNCIÓN PARA PERMITIR SOLO NÚMEROS
	function validatenum(event) {
		var key = window.event ? event.keyCode : event.which;

		if(event.keyCode > 47 && event.keyCode < 58){
			return true;
		} else {
			$("#numeros").dialog({
				modal: true,
	            width: 270,
	            height: 170,
	            show: {effect : "fold" ,duration: 300},
	            hide: {effect : "explode", duration: 300},
	            resizable: "false",
	            buttons: { "OK": function () { $(this).dialog("close"); } },   
        	});
			return false;
		}
	}
});