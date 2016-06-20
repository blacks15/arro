$(document).ready(function(){

	jQuery("#empleados").jqGrid({
		url:'../php/buscar_empleado.php',
		datatype: 'json',
		mtype: 'POST',
		colNames:['ID','NOMBRE','APELLIDOS','DIRECCIÓN','CIUDAD','ESTADO','TELÉFONO','CELULAR','TIPO','SUELDO','STATUS'],
		colModel:[
			{name:'matricula', index:'matricula', width:80, resizable:false, align:"center",search:false,key:true},
			{name:'nombre_empleado', index:'nombre_empleado', width:190,resizable:false},
			{name:'apellidos', index:'apellidos', width:190,search:true},
			{name:'direccion', index:'direccion',search:false, width:400},
			{name:'ciudad', index:'ciudad',search:true, width:180},
			{name:'estado', index:'estado',search:true, width:190},
			{name:'telefono', index:'telefono',search:false, width:200},
			{name:'celular', index:'celular',search:false, width:200},
			{name:'sueldo', index:'sueldo',search:false, width:150,formatter:'currency',formatoptions: {prefix:'$', suffix:'', thousandsSeparator:','}},
			{name:'tipo', index:'tipo',search:false, width:100},
			{name:'status', index:'status',search:false, width:190}
        ],
		height: "100%",
		autowidth: true,
		pager: '#pager2',
	    rowNum: 10,
    	rowList: [10,20],
        sortname: 'matricula',
        sortorder: 'desc',
        viewrecords: true,
        caption: 'EMPLEADOS',
        altRows: true,
        gridview : true,
        pagination: true,
        onSelectRow: function(ids) {
        	var selr = jQuery('#empleados').jqGrid('getGridParam','selrow'); 
            if(!selr){
            	$("#war").dialog({
                    modal: true,
                    width: 270,
                    height: 170,
                    show: {effect : "fold" ,duration: 300},
                    hide: {effect : "explode", duration: 300},
                    resizable: "false",
                    buttons: { "OK": function () { $(this).dialog("close"); } },   
                });
            }  
            return false; 
        }
    });

	jQuery("#empleados").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false},
		{height:280,reloadAfterSubmit:true},//opciones edit
		{}, //opciones add
		{}, //opciones del
		{multipleSearch:true,closeAfterSearch: true, closeOnEscape: true}//opciones search
	);

	$("#empleados").jqGrid('navButtonAdd','#pager2',{
		caption: "Borrar", 
		buttonicon :'ui-icon-trash',
		onClickButton : function (){ 
		        borrar();
		} 
	}); 

	$(window).on("resize", function () {
		var $grid = $("#empleados"),
		newWidth = $grid.closest(".ui-jqgrid").parent().width();
		$grid.jqGrid("setGridWidth", newWidth, true);
	});

    jQuery("#empleados").jqGrid("filterToolbar");
    	//BOTÓN INGRESAR NUEVO
    $("#btnNew").click(function(){
    	window.location.href = "../pages/CrearEmpleado.html";
    });

});