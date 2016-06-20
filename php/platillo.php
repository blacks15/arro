<?php 
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	require_once ('Conf.class.php');
	$bd = Db::getInstance();

	$opc = $_POST['opc'];

	switch ($opc){
		case 'guardar_platillo':
			guardar_platillo();
		break;
	}

	function guardar_platillo(){
			//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);

		$nombre = trim($_POST['nombre']);
		$tipo = trim($_POST['tipo']);
		$precio = trim($_POST['precio']);		
		$respuesta = false;
			//COMPROBAMOS SI EL EMPLEAOD EXISTE
		$sql = "select * from platillos where nombre_platillo = '".$nombre."' ";

		$res = mysql_query($sql) or die(mysql_error());
		if (mysql_num_rows($res) > 0){
			$existe = true;
			$existeJSON = array('existe' => $existe);
			print(json_encode($existeJSON));
			exit();
		} else {
				//REALIZAMOS LA CONSULTA
			$consulta = "insert into platillos (nombre_platillo,categoria,precio) 
				values ('".$nombre."','".$tipo."','".$precio."')";
					//EJECUTAMOS LA CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());

			if ($resultado == true){
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta);
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo);
				print(json_encode($falloJSON));
			}
		}
	}
?>