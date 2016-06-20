$(document).ready(function(){

	var rowsToColor = [];
		//LLENA EL GRID
	jQuery("#productos").jqGrid({
		url:'../php/buscar_producto.php',
		datatype: 'json',
		mtype: 'POST',
		colNames:['ID','NOMBRE','PROVEEDOR','UNIDAD DE MEDIDA','CANTIDAD ACTUAL','PRECIO COMPRA', 'STATUS'],
		colModel:[
			{name:'clave_producto', index:'clave_producto', width:90, resizable:false, align:"center",search:false,key:true},
			{name:'nombre_producto', index:'nombre_producto', width:400,resizable:false,search:true},
	        {name:'proveedor', index:'proveedor', width:200,search:true},
	        {name:'unidad_medida', index:'unidad_medida', width:270,search:true,search:false},
	        {name:'cantidad_actual', index:'cantidad_actual', width:230,search:false, align:"center",formatter: rowcolor},
	        {name:'precio', index:'precio',formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','},search:false, width:180, align:"center"},
	        {name:'status', index:'status',search:false, width:180}
        ],
		height: "100%",
		autowidth: true,
		pager: '#pager2',
	    rowNum: 10,
    	rowList: [10,20],
        sortname: 'clave_producto',
        sortorder: 'desc',
        viewrecords: true,
        caption: 'PRODUCTOS',
        altRows: true,
        gridview : true,
        pagination: true,
        loadComplete: function(){
			estado();
			for (var i = 0; i < rowsToColor.length; i++) {
				$("#" + rowsToColor[i]).find("td").css("background-color", "#ff0000");
				$("#" + rowsToColor[i]).find("td").css("color", "white");
			}//END FOR
		},
    });
		//ICONOS EN EL PIE DEL GRID
	jQuery("#productos").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
		{height:280,reloadAfterSubmit:true},//opciones edit
		{}, //opciones add
		{}, //opciones del
		{multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
	);
		//ICONO DE BORRAR EN GRID
	$("#productos").jqGrid('navButtonAdd','#pager2',{
		caption: "Borrar", 
		buttonicon :'ui-icon-trash',
		onClickButton : function (){ 
		        borrar();
		} 
	}); 
		//FUNCIÓN PARA REDIMENSIONAR DEL GRID
	$(window).on("resize", function () {
		var $grid = $("#productos"),
		newWidth = $grid.closest(".ui-jqgrid").parent().width();
		$grid.jqGrid("setGridWidth", newWidth, true);
	});
		//BARRA DE BUSQUEDA
    jQuery("#productos").jqGrid("filterToolbar");
    	//BOTÓN INGRESAR NUEVO
	$("#btnNew").click(function(){
    	window.location.href = "../pages/CrearProducto.html"
    });
		//FUNCIÓN PARA PINTAR FILA DE GRID
	function rowcolor(cellValue, options, rowObject) {
		if (cellValue <= 1)
	 		rowsToColor[rowsToColor.length] = options.rowId;
		return cellValue;
	}
		//FUNCIÓN PARA ACTUALIZAR ESTADO DE PRODUCTO 
	function estado(){
		var id = $("#productos").jqGrid('getGridParam','selrow'); 
		var data = $("#productos").getRowData(id);
		var detalle = JSON.stringify(data);

		$.ajax({
			cache: false,
			type: "POST",
			dataType: "JSON",
			url: "../php/estado_producto.php",
			data: {detalle: detalle},
			success: function(msg){
				if (msg.respuesta == true) {
					console.log("correcto");
				} else {
					console.log("error");
				} 
			},
			error: function(ajaxOptions,throwError){
				console.log(throwError);
			} 
		});
			//RECARGAR GRID
		$("#productos").trigger("reloadGrid");
	}

});