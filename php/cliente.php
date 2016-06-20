<?php 
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	require_once ('Conf.class.php');
	$bd = Db::getInstance();

	$opc = $_POST['opc'];

	switch ($opc) {
		case 'guardar_cliente':
			guardar_cliente();
		break;

	}

	function guardar_cliente(){
			//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);

		global $nombre_completo;
		$nombre = trim($_POST['nombre']);
		$apaterno = trim($_POST['apaterno']);
		$amaterno = trim($_POST['amaterno']);		
		$calle = trim($_POST['calle']);
		$num = trim($_POST['num']);
		$col = trim($_POST['col']);
		$tel = trim($_POST['tel']);
		$cel = trim($_POST['cel']);
		$estado = 'ACTIVO';
		$respuesta = false;
		$nombre_completo = $nombre .' '.$apaterno.' '.$amaterno;
			//COMPROBAMOS SI EL CLIENTE EXISTE
		$sql = "select * from clientes where nombre_cliente = '".$nombre."' and apellido_paterno = '".$apaterno."'
				and apellido_materno = '".$amaterno."' ";
		-
		$res = mysql_query($sql) or die(mysql_error());
		if (mysql_num_rows($res) > 0) {
			$existe = true;
			$existeJSON = array('existe' => $existe,
				'nombre' => $nombre_completo );
			print(json_encode($existeJSON));
			exit();
		} else {
				//REALIZAMOS LA CONSULTA
			$consulta = "insert into clientes (nombre_cliente,apellido_paterno,apellido_materno,
				calle,numero,colonia,telefono,celular,status) 
			values ('".$nombre."','".$apaterno."','".$amaterno."','".$calle."','".$num."','".$col."',
			'".$tel."','".$cel."','".$estado."')";
				//EJECUTAMOS LA CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());

			if ($resultado == true){
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta ,
					'nombre' => $nombre_completo);
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo,
					'nombre' => $nombre_completo);
				print(json_encode($falloJSON));
			}
		}
	}

 ?>