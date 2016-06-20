$(document).ready(function(){
	ocultar();
		//DATETIME PICKER
	$("#date").datepicker({
			dateFormat: "dd-MM-yy"
	});
	$("#date").datepicker('setDate', '+0');

	$("#mas").click(function(){
		$("#addProd").dialog({
			title: "Agregar Producto", 
            width: 590,  
            height: 350,
            show: "scale",
            hide: "explode",
            resizable: "false",
            position: "center",
            modal: "true"
        });
	});

	$("#add").click(function(){
		var cantidad = $("#cant").val();
		var producto = $("#prod").val();
		var desc = $("#desc").val();
		var detalle = $ ("#detalle");

		if (validar_grid()) {
			detalle.append("<tr><td><center>"+ cantidad + "</center></td><td><center>"+producto+"</center></td><td><center>"+desc+"</center></td><td><center>"+30+"</center></td><td><center>"+'<button id="menos" class="btn" type="button"><i class="fa fa-fw fa-minus-circle icon-red"></i></button></center></td></tr>');
			limpiar();
			$("#addProd").dialog( "close" );
		} else {
			alert("error");
		}
	});
		//FUNCIÓN VALIDAR GRID
	function validar_grid(){
		ocultar();
		var cantidad = $("#cant").val();
		var producto = $("#prod").val();

		if (producto == "") {
			$("#prod").focus();
			$("#errorprod").show();
			return false;
		} else 	if (cantidad == "") {
			$("#cant").focus();
			$("#errorcant").show();
			return false;
		} else {
			return true;
		}
	}

		//FUNCIÓN LIMPIAR INPUTS PARA EL GRID
	function limpiar(){
		$("#cant").val("");
		$("#prod").val("");
	}

		//LLENAR COMBO USANDO CHOSEN
	$('.chosen').chosen({
		allow_single_deselect: true,
		placeholder_text_single: "SELECCIONE",
		no_results_text: "!No Hay Resultados!"
	});
		//FUNCIÓN OCULTAR 
	function ocultar() {
		$("#errornoex").hide();
		$("#erroruser").hide();
		$("#errordate").hide();
		$("#errorcant").hide();
		$("#errorprod").hide();
	}
});