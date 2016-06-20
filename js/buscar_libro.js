$(document).ready(function(){
	ocultar();
		//LLENA GRID
	jQuery("#libros").jqGrid({
		url:'../php/buscar_libro.php',
		datatype: 'json',
		mtype: 'POST',
		colNames:['ISBN','NOMBRE LIBRO','EDITORIAL','AUTOR'],
		colModel:[
			{name:'clave_libro', index:'clave_libro', width:110, resizable:false, align:"center",search:false,key:true},
			{name:'nombre_libro', index:'nombre_libro', width:300,resizable:false,search:true},
	        {name:'editorial', index:'editorial', width:150,search:true},
	        {name:'autor', index:'autor', width:200,search:true},
	    ],
		height: "100%",
		autowidth: true,
		pager: '#pager2',
	    rowNum: 10,
    	rowList: [10],
        sortname: 'clave_libro',
        sortorder: 'desc',
        viewrecords: true,
        caption: 'LIBROS',
        altRows: true,
        gridview : true,
        pagination: true,
    });
		//ICONOS EN EL PIE DEL GRID
	jQuery("#libros").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
		{height:280,reloadAfterSubmit:true},//opciones edit
		{}, //opciones add
		{}, //opciones del
		{multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
	);
		//ICONO BORRAR EN GRID
	$("#libros").jqGrid('navButtonAdd','#pager2',{
		caption: "Borrar", 
		buttonicon :'ui-icon-trash',
		onClickButton : function (){ 
		        borrar();
		} 
	}); 
		//FUNCIÓN PARA REDIMENSIONAR EL GRID
	$(window).on("resize", function () {
		var $grid = $("#libros"),
		newWidth = $grid.closest(".ui-jqgrid").parent().width();
		$grid.jqGrid("setGridWidth", newWidth, true);
	});
		//BARRA DE BUSQUEDA
    jQuery("#libros").jqGrid("filterToolbar");
    	//BOTÓN INGRESAR NUEVO	
    $("#btnNew").click(function(){
    	window.location.href = "../pages/CrearLirbo.html"
    });

		//FUNCIÓN PARA OCULTAR MENSAJES DE ERROR
	function ocultar(){
		$("#del").hide();
		$("#war").hide();
		$("#mensajealta").hide();
	}
});
