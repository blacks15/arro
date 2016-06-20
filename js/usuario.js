$(document).ready(function(){
	ocultar();
	disable();
	$("#nombre").focus();
	$("#btnUpdate").hide();

		//AAUTOCOMPLETAR CAMPO
	$("#nombre").autocomplete({
		minLength: 2,
        source: "../php/autocomplete.php?opc=usuario",
        autoFocus: true,
		select: function (event, ui) {
        	$('#id').val(ui.item.id);
            return ui.item.label;
        },
    });

	$("#nombre").focusout(function(){
		if (!$("#nombre").val() == "") {
			habilitar();
		}
	});

	function habilitar(){
		$("#username").prop('disabled', false);
		$("#password").prop('disabled', false);
		$("#repite").prop('disabled', false);
		$("#tipo").prop('disabled',false);
		$("#btnSave").prop('disabled',false);
		$('.chosen').trigger('chosen:updated');
	}

		//FUNCIÓN PARA DESHABILITAR
	function disable(){
		$("#username").prop('disabled', true);
		$("#password").prop('disabled', true);
		$("#repite").prop('disabled', true);
		$("#tipo").prop('disabled',true);
		$("#btnSave").prop('disabled',true);
		$('.chosen').trigger('chosen:updated');
	}
			//LLENAR COMBO USANDO CHOSEN
	$('.chosen').chosen({
		disable_search: true,
		allow_single_deselect: true,
		placeholder_text_single: "SELECCIONE",
		no_results_text: "!No Hay Resultados!"
	});
		//FUNCIÓN PARA OCULTAR CAMPOS
	function ocultar(){
		$("#mensajealta").hide();
		$("#upd").hide();
		$("#existe").hide();
		$("#full").hide();
		$("#letras").hide();
		$("#error").hide();
		$("#errormat").hide();
		$("#nodisp").hide();
		$("#disp").hide();
		$("#erroruser").hide();
		$("#errorpass").hide();
		$("#errornc").hide();
		$("#errorrepite").hide();
	}
});