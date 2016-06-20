$(document).ready(function(){
    ocultar();
	var fileExtension = "";
	
	$(':file').change(function() {
        	//obtenemos un array con los datos del archivo
    	var file = $("#imagen")[0].files[0];
       	 	//obtenemos el nombre del archivo
        var fileName = file.name;
       		//obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        	//obtenemos el tamaño del archivo
        var fileSize = file.size;
        	//obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        	//mensaje con la información del archivo
        showMessage("<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" bytes.</span>");
    });
        //FUNCIÓN PREVISUALIZAR IMAGEN
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $("#showimage").attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }
        //PREVISUALIZAR IMAGEN
    $("#imagen").change(function(){
        readURL(this);
    });
        //MOSTRAR MENSAJE DE IMAGEN
	function showMessage(message){
	    $(".messages").html("").show();
	    $(".messages").html(message);
	}
        //BOTÓN GUARDAR
	$("#btnSave").click(function(){
		
		var inputFileImage = document.getElementById('imagen');
		var file = inputFileImage.files[0];
		var data = new FormData();
		data.append('archivo',file);
		
		$.ajax({
			cache: false,
            url: '../php/img.php',
            type: "POST",
            data: data,
            contentType: false,
            processData: false,
            success: function(datos) {
                $("#respuesta").html(datos);
            }
        });

	});
        //LIMITAR ARCHIVO A IMAGEN
	function isImage(extension) {
	    switch(extension.toLowerCase()) {
	        case 'jpg': case 'png': case 'jpeg':
	            return true;
	        break;
	        default:
	            return false;
	        break;
	    }
	}
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
        $("#errorapaterno").hide();
        $("#erroramaterno").hide();
        $("#errorcalle").hide();
        $("#errornum").hide();
        $("#errorcol").hide();
        $("#errorcel").hide();
        $("#errorsueldo").hide();
        $("#errortipo").hide();
    }

});