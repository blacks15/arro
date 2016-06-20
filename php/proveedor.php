<?php 
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	require_once ('Conf.class.php');
	$bd = Db::getInstance();

	$opc = $_POST['opc'];

	switch ($opc) {
		case 'guardar_proveedor':
			guardar_proveedor();
		break;

	}

	function guardar_proveedor(){
			//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);
		
		$empresa = trim($_POST['empresa']);
		$contacto = trim($_POST['contacto']);
		$calle = trim($_POST['calle']);
		$num = trim($_POST['num']);
		$col = trim($_POST['col']);
		$tel = trim($_POST['tel']);
		$cel = trim($_POST['cel']);
		$estado = 'ACTIVO';
		$respuesta = false;
		
			//COMPROBAMOS SI EL PROVEEDOR EXISTE
		$sql = "select * from proveedores where empresa = '".$empresa."' and 
			contacto = '".$contacto."' ";

		$res = mysql_query($sql) or die(mysql_error());
		if (mysql_num_rows($res) > 0) {
			$existe = true;
			$existeJSON = array('existe' => $existe );
			print(json_encode($existeJSON));
		} else {
				//REALIZAMOS LA CONSULTA
			$consulta = "insert into proveedores (empresa,contacto,calle,numero,colonia,telefono,
				celular,status) 
			values ('".$empresa."','".$contacto."','".$calle."','".$num."','".$col."','".$tel."',
				'".$cel."','".$estado."')";
				//EJECUTAMOS LA CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());

			if ($resultado == true){
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta );
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo);
				print(json_encode($falloJSON));
			}
		}
	}

?>