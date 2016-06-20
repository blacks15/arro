$(function(){
	$("#mensajealta").hide();
	$(".dropdown-menu > li > a.trigger").on("mouseover",function(e){
		var current = $(this).next();
		var grandparent = $(this).parent().parent();
		if($(this).hasClass('left-caret') || $(this).hasClass('right-caret'))
			$(this).toggleClass('right-caret left-caret');
		grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
		grandparent.find(".sub-menu:visible").not(current).hide();
		current.toggle();
		e.stopPropagation();
	});

	$(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
		var root = $(this).closest('.dropdown');
		root.find('.left-caret').toggleClass('right-caret left-caret');
		root.find('.sub-menu:visible').hide();
	});

	$.ajax({
		cache: false,
		type: "POST",
		datatype: "json",
		url: "../php/error.php",
		success: function(opciones){
			if (opciones.respuesta == true) {
				$("#mensajealta").dialog({
					modal: true,
		            width: 270,
		            height: 170,
		            show: {effect : "fold", duration: 300},
		            hide: {effect : "explode", duration: 300},
		            resizable: "false",
		            buttons: {"ok": function() {window.location.href = "../index.php";} },   
		        });
			}
		},
		error: function(xhr,ajaxOptions,throwError){
			console.log(xhr);
		} 
	});

});