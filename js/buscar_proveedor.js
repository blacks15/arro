$(document).ready(function(){
		//LLENA GRID
	jQuery("#proveedores").jqGrid({
		url:'../php/buscar_proveedor.php',
		datatype: 'json',
		mtype: 'POST',
		colNames:['ID','PROVEEDOR','CONTACTO','DIRECCIÓN','TELÉFONO', 'CELULAR'],
		colModel:[
			{name:'clave_proveedor', index:'clave_proveedor', width:90, resizable:false, align:"center",search:false,key:true},
			{name:'empresa', index:'empresa', width:200,resizable:false,search:true},
	        {name:'contacto', index:'contacto', width:200,search:true},
	        {name:'direccion', index:'direccion', width:350,search:true},
	        {name:'telefono', index:'telefono', width:100,search:false, align:"center"},
	        {name:'celular', index:'celular',search:false, width:100, align:"center"},
	    ],
		height: "100%",
		autowidth: true,
		pager: '#pager2',
	    rowNum: 10,
    	rowList: [10,20],
        sortname: 'clave_proveedor',
        sortorder: 'desc',
        viewrecords: true,
        caption: 'PROVEEDORES',
        altRows: true,
        gridview : true,
        pagination: true,
    });
		//ICONOS EN EL PIE DEL GRID
	jQuery("#proveedores").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
		{height:280,reloadAfterSubmit:true},//opciones edit
		{}, //opciones add
		{}, //opciones del
		{multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
	);
		//ICONO BORRAR EN GRID
	$("#proveedores").jqGrid('navButtonAdd','#pager2',{
		caption: "Borrar", 
		buttonicon :'ui-icon-trash',
		onClickButton : function (){ 
		        borrar();
		} 
	}); 
		//FUNCIÓN PARA REDIMENSIONAR EL GRID
	$(window).on("resize", function () {
		var $grid = $("#proveedores"),
		newWidth = $grid.closest(".ui-jqgrid").parent().width();
		$grid.jqGrid("setGridWidth", newWidth, true);
	});
		//BARRA DE BUSQUEDA
    jQuery("#proveedores").jqGrid("filterToolbar");
    	//BOTÓN INGRESAR NUEVO	
    $("#btnNew").click(function(){
    	window.location.href = "../pages/CrearProveedor.html"
    });

});