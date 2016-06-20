<?php 
	require_once("conexion.php");
	header('Content-Type: application/json');
	error_reporting(0);
	session_start();
	conectarse();

	$opc = $_POST['opc'];
	switch ($opc) {
		case 'guardar_producto':
			guardar_producto();
		break;
	}

	function guardar_producto(){
			//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);
		// $nombre = trim($_POST['nombre']);
		// $prov = trim($_POST['prov']);
		// $um = trim($_POST['um']);
		// $cant = trim($_POST['cant']);
		// $compra = trim($_POST['compra']);
		$status = 'DISPONIBLE';
		foreach ($_POST as $clave => $valor) {
			${$clave} = $_POST[$clave];
		}
		$respuesta = false;
			//VALIDAMOS SI EXISTE EL PRODUCTO
		$sql = "select * from productos where nombre_producto = '".$nombre."' ";
		
	 	$res = mysql_query($sql) or die(mysql_error());
	 	
	 	if (mysql_num_rows($res) > 0){
	 		$existe = true;
	 		$existeJson = array('existe' => $existe,
	 			'nombre' => $nombre);
	 		print (json_encode($existeJson));
	 		exit();
	 	} else {
				//GENERAMOS LA CONSULTA
		 	$consulta = "insert into productos (nombre_producto,proveedor,cantidad_actual,
					cantidad_minima,compra,venta,status) values ('".$nombre."','".$prov."','".$cant."',
		 			'".$minima."','".$compra."','".$venta."','".$status."')";
		 	echo $consulta;
		 		//EJECUTAMOS LA CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());

			if ($resultado == true) {
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta,
					'nombre' => $nombre);
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo,
					'nombre' => $nombre);
				print(json_encode($falloJSON));
			}	
		}		
	}

?>