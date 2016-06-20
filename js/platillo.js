$(document).ready(function(){

	$("#nombre").focus();
	$("#btnUpdate").hide();
	ocultar();
			//LLENAR COMBO USANDO CHOSEN
	$('.chosen').chosen({
		allow_single_deselect: true,
		placeholder_text_single: "SELECCIONE",
		no_results_text: "!No Hay Resultados!"
	});

        //FUNCIÓN SUBIR IMAGEN
    function subirimagen(){
        var name = $("#nombre").val();
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
            success: function(response) {
                if (response.respuesta == true) {
                    console.log("imagen subida correctamente");                } 
            }
        });
        return true;
    }
        //BOTÓN GUARDAR
	$("#btnSave").click(function(){
        var cadena = $("#platillo").serialize();

		if (validar()) {
            $.ajax({
                cache: false,
                type: "post",
                dataType: 'json',
                url: '../php/platillo.php',
                data: {opc:"guardar_platillo",cadena },
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
                                modal: true,
                                width: 270,
                                height: 200,
                                show: {effect : "fold" ,duration: 350},
                                hide: {effect : "explode", duration: 300},
                                resizable: "false",
                                buttons: { "OK": function () {$(this).dialog("close"); }},   
                            });
                            limpiar();  
                        }
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
                            buttons: { "OK": function () { 
                                window.location.reload();
                            } },   
                        });
                        limpiar();
                    }
                },  
                error: function(ajaxOptions,throwError){
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
	});
        //BOTÓN VER
    $("#btnGo").click(function(){
        window.location.href = "../pages/BuscarPlatillo.html";
    });
        //BOTÓN REFRESCAR  
    $("#reset").click(function(){
        window.location.reload();
    });
        //FUNCIÓN PARA LIMPIAR LOS CAMPOS
    function limpiar(){
        $("#bus").val("");
        $("#id").val("");
        $("#nombre").val("");
        $("#precio").val("");
        $("#tipo").prop('selectedIndex', 0);
        $('.chosen').trigger('chosen:updated');
        $("#imagen").closest('form').trigger('reset');
    }

        //FUNCIÓN PARA VALIDAR CAMPOS
    function validar(){
        ocultar();
        var nombre = $("#nombre").val();
        var tipo = $("#tipo").val();
        var precio = $("#precio").val();

        if (nombre == "") {
            $("#nombre").focus();
            $("#errornombre").show('slide',500);
            return false;
        } else if (tipo == 0 || tipo == "") {
            $("#tipo").focus();
            $("#errorcategoria").show('slide',500);
            return false;
        } else if (precio == 0 || precio == "") {
            $("#precio").focus();
            $("#errorprecio").show('slide',500);
            return false;
        } else if (!$("#imagen").val()) {
            $("#imagen").focus();
            $("#errorimagen").show('slide',500);
            return false;
        }
        return true;
    }

        //FILE INPUT
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
    });
        //FUNCIÓN PARA OCULTAR MENSAJES
    function ocultar(){
        $("#mensajealta").hide();
        $("#upd").hide();
        $("#existe").hide();
        $("#full").hide();
        $("#letras").hide();
        $("#error").hide();
        $("#errorbuscar").hide();
        $("#errornombre").hide();
        $("#errorcategoria").hide();
        $("#errorprecio").hide();
        $("#errorimagen").hide();
    }

});