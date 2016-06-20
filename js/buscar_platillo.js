$(document).ready(function(){
	$("#war").hide();
		//LLENA EL GRID
	jQuery("#platillos").jqGrid({
		url:'../php/buscar_platillo.php',
		datatype: 'json',
		mtype: 'POST',
		colNames:['CATEGORIA','ID','NOMBRE','PRECIO'],
		colModel:[
	        {name:'categoria', index:'categoria', width:270,search:true,search:false},
			{name:'clave_platillo', index:'clave_platillo', width:90, resizable:false, align:"center",search:false,key:true},
			{name:'nombre_platillo', index:'nombre_platillo', width:400,resizable:false,search:true,align:"center"},
	        {name:'precio', index:'precio',formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','},search:false, width:180, align:"center"},
        ],
		height: "100%",
		autowidth: true,
		pager: '#pager2',
	    rowNum: 10,
	    rowList: [10,20],
        sortname: 'clave_platillo',
        sortorder: 'desc',
        caption: 'PRODUCTOS',
        altRows: true,
		grouping: true,
		groupingView: {
			groupField: ["categoria"],
			groupColumnShow: [false],
			groupText: ["<b>{0}</b>"],
			groupSummary: [false],
			groupCollapse: false
		}
    });
    jQuery("#platillos").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
		{height:280,reloadAfterSubmit:true},//opciones edit
		{}, //opciones add
		{}, //opciones del
		{}//opciones search
	);
    	//MOSTRAMOS EL ICONO PARA LA IMAGEN
	$("#platillos").jqGrid('navButtonAdd','#pager2',{
		caption: "", 
		buttonicon :'ui-icon-image',
		onClickButton : function (){
			mostrar_imagen();		
		} 
	});
		//FUNCIÓN PARA MOSTRAR IMAGEN DEL PLATILLO
	function mostrar_imagen(){
		var rowId =$("#platillos").jqGrid('getGridParam','selrow');  
		var rowData = jQuery("#platillos").getRowData(rowId);
		var colData = rowData['nombre_platillo'];
		if (rowId == "" || rowId == undefined) {
			$("#war").dialog({
                modal: true,
                width: 270,
                height: 200,
                show: {effect : "fold" ,duration: 300},
                hide: {effect : "explode", duration: 300},
                resizable: "false",
                buttons: { "OK": function () { $(this).dialog("close"); } },   
            });
		} else {
				//RECUPERAMOS LA IMAGEN DEL PLATILLO
			var imagen = "../images/"+colData+".png";
			document.images["ip"].src = imagen;
				//CREAMOS LA VENTANA MODAL
			$("#ventana").dialog({
				title: "Imagen Platillo", 
	            width: 300,  
	            height: 350,
	            show: "scale",
	            hide: "explode",
	            resizable: "false",
	            position: "rigth",
	            modal: "true",
	        });
		}
	}
		//FUNCIÓN PARA REDIMENSIONAR DEL GRID
	$(window).on("resize", function () {
		var $grid = $("#platillos"),
		newWidth = $grid.closest(".ui-jqgrid").parent().width();
		$grid.jqGrid("setGridWidth", newWidth, true);
	});
	    //BOTÓN INGRESAR NUEVO
	$("#btnNew").click(function(){
    	window.location.href = "../pages/CrearPlatillo.html"
    });
});