<?php 
	require_once('conexion.php');
	/*Incluimos el fichero de la clase Conf*/
	header('Content-Type: application/json');
	error_reporting(0);
	session_start();
	conectarse();

	$opc = $_GET['opc'];

	switch ($opc) {
		case 'cliente':
			cliente();
		break;

		case 'empleado':
			empleado();
		break;

		case 'producto':
			producto();
		break;

		case 'producto_existencia':
			producto_existencia();
		break;

		case 'usuario':
			usuario();
		break;
	}

	function usuario(){
		$buscar = trim($_GET['term']);
			//VALIDAMOS SI LA BÚSQUEDA VIENE VACIA Y CREAMOS LA CONSULTA
		if(!empty($buscar)) {
      		$sql = "select matricula,concat(nombre_empleado,' ',apellido_paterno,' ',
      			apellido_materno) as nombre_empleado
                from empleados 
        	WHERE nombre_empleado LIKE '%".$buscar."%' ";
        		//EJECUTAMOS LA CONSULTA
        	$resultado = mysql_query($sql) or die(mysql_error());
        	$contar = mysql_num_rows($resultado);
      			//VALIDAMOS SI HAY RESUPUESTA Y RECORREMOS EL ARRAY PARA LLENARLO CON LA RESPUESTA
        	if($contar > 0){
				while($row = mysql_fetch_array($resultado)){
                	$respuesta[] = array('value' => $row['nombre_empleado'] ,
                		'id' => $row['matricula'] );
				}
            	print(json_encode($respuesta));
        	}
		}
	}

	function producto_existencia(){
		$name = trim($_POST['name']);
			//VALIDAMOS SI EL NOMBRE ESTA VACIO Y CREAMOS LA CONSULTA
		if (!empty($name)) {
			$sql = "select cantidad_actual,nombre_medida 
				from productos p
				inner join unidad_medida um on um.clave_medida = p.unidad_medida
				where nombre_producto = '".$name."' ";
				//EJECUTAMOS LA CONSUTA
			$resultado = mysql_query($sql) or die(mysql_error());
			$contar = mysql_num_rows($resultado);
				//VALIDAMOS SI HAY RESUPUESTA Y RECORREMOS EL ARRAY PARA LLENARLO CON LA RESPUESTA
        	if($contar > 0){
				while($row = mysql_fetch_array($resultado)){
                	$respuesta->existencia = $row['cantidad_actual'];
                	$respuesta->um = $row['nombre_medida'];
				}
            	print(json_encode($respuesta));
        	}
		} else {
			echo "Variable vacia";
		}
	}

	function producto(){
		$buscar = trim($_GET['term']);
			//VALIDAMOS SI LA BÚSQUEDA VIENE VACIA Y CREAMOS LA CONSULTA
		if(!empty($buscar)) {
      		$sql = "select clave_producto,nombre_producto
                from productos 
        	WHERE nombre_producto LIKE '%".$buscar."%' ";
        		//EJECUTAMOS LA CONSULTA
        	$resultado = mysql_query($sql) or die(mysql_error());
        	$contar = mysql_num_rows($resultado);
      			//VALIDAMOS SI HAY RESUPUESTA Y RECORREMOS EL ARRAY PARA LLENARLO CON LA RESPUESTA
        	if($contar > 0){
				while($row = mysql_fetch_array($resultado)){
                	$respuesta[] = array('value' => $row['nombre_producto'] ,
                		'id' => $row['clave_producto'] );
				}
            	print(json_encode($respuesta));
        	}
		}

	}

	function empleado(){
		$buscar = trim($_GET['term']);
			//VALIDAMOS SI LA BÚSQUEDA VIENE VACIA Y CREAMOS LA CONSULTA
		if(!empty($buscar)) {
      		$sql = "select matricula,concat(nombre_empleado,' ',apellido_paterno,' ',
      			apellido_materno) as nombre_empleado
                from empleados 
        	WHERE nombre_empleado LIKE '%".$buscar."%' ";
        		//EJECUTAMOS LA CONSULTA
        	$resultado = mysql_query($sql) or die(mysql_error());
        	$contar = mysql_num_rows($resultado);
      			//VALIDAMOS SI HAY RESUPUESTA Y RECORREMOS EL ARRAY PARA LLENARLO CON LA RESPUESTA
        	if($contar > 0){
				while($row = mysql_fetch_array($resultado)){
                	$respuesta[] = array('value' => $row['nombre_empleado'] ,
                		'id' => $row['matricula'] );
				}
            	print(json_encode($respuesta));
        	}
		}
	}

	function cliente(){
		$buscar = trim($_GET['term']);
			//VALIDAMOS SI LA BÚSQUEDA VIENE VACIA Y CREAMOS LA CONSULTA
		if(!empty($buscar)) {
      		$sql = "select matricula,concat(nombre_cliente,' ',apellido_paterno,' ',
      			apellido_materno) as nombre_cliente
                from clientes 
        	WHERE nombre_cliente LIKE '%".$buscar."%' ";
        		//EJECUTAMOS LA CONSULTA
        	$resultado = mysql_query($sql) or die(mysql_error());
        	$contar = mysql_num_rows($resultado);
        		//VALIDAMOS SI HAY RESUPUESTA Y RECORREMOS EL ARRAY PARA LLENARLO CON LA RESPUESTA
        	if($contar > 0){
				while($row = mysql_fetch_array($resultado)){
                	$respuesta[] = array('value' => $row['nombre_cliente'] ,
                		'id' => $row['matricula'] );
				}
            	print(json_encode($respuesta));
        	}
		}
	}




?>