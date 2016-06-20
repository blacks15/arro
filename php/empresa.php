<?php 
	/*Incluimos el fichero de la clase Db*/
	require_once('conexion.php');
	conectarse();

	header('Content-Type: application/json');
	error_reporting(0);
	session_start();

	$opc = $_POST['opc'];

	switch ($opc) {
		case 'guardar_empresa':
			guardar_empresa();
		break;

		case 'verificar_empresa':
			verificar_empresa();
		break;

		case 'modificar_empresa':
			modificar_empresa();
		break;
	}

	function modificar_empresa(){
			//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);

		$nombre = trim($_POST['nombre']);
		$rfc = trim($_POST['rfc']);
		$email = trim($_POST['email']);
		$web = trim($_POST['web']);
		$calle = trim($_POST['calle']);
		$num = trim($_POST['num']);
		$col = trim($_POST['col']);
		$city = trim($_POST['city']);
		$edo = trim($_POST['edo']);
		$tel = trim($_POST['tel']);
		$cel = trim($_POST['cel']);
			//REALIZAMOS LA CONSULTA
		$consulta = "update empresa set nombre_empresa = '".$nombre."',rfc = '".$rfc."',
			calle = '".$calle."',numero = '".$num."',colonia = '".$col."',ciudad = '".$city."',
			estado = '".$edo."',telefono = '".$tel."',celular = '".$cel."',email = '".$email."',
			web= '".$web."' where nombre_empresa = '".$nombre."' ";
			//EJECUTAMOS LA CONSULTA
		$resultado = mysql_query($consulta)or die(mysql_error());

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

	function verificar_empresa(){
			//REALIZAMOS LA CONSULTA
		$sql = "select nombre_empresa,rfc,concat(calle,' ',numero,' ',colonia)as domicilio,ciudad,estado,telefono,celular,email,web from empresa";
			//EJECUTAMOS LA CONSULTA
		$res = mysql_query($sql) or die(mysql_error());

		if (mysql_num_rows($res) > 0)  {
				//RECORREMOS EL ARRAY Y LE ASIGNAMOS LA RESPUESTA
			$row = mysql_fetch_array($res);

			$respuesta->nombre = $row['nombre_empresa'];
			$respuesta->rfc = $row['rfc'];
			$respuesta->domicilio = $row['domicilio'];
			$respuesta->city = $row['ciudad'];
			$respuesta->edo = $row['estado'];
			$respuesta->tel = $row['telefono'];
			$respuesta->cel = $row['celular'];
			$respuesta->email = $row['email'];
			$respuesta->web = $row['web'];
			$respuesta->tipo = $_SESSION['tipo'];

        	print(json_encode($respuesta));
		} else {
			$nueva = true;
			$nuevaJSON = array('nueva' => $nueva );
			print(json_encode($nuevaJSON));
			exit();
		}
	}
	function guardar_empresa(){
			//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);

		$nombre = trim($_POST['nombre']);
		$rfc = trim($_POST['rfc']);
		$email = trim($_POST['email']);
		$web = trim($_POST['web']);
		$calle = trim($_POST['calle']);
		$num = trim($_POST['num']);
		$col = trim($_POST['col']);
		$city = trim($_POST['city']);
		$edo = trim($_POST['edo']);
		$tel = trim($_POST['tel']);
		$cel = trim($_POST['cel']);
			//COMPROBAMOS SI YA HAY UNA EMPRESA DADA DE ALTA
		$sql = "select nombre_empresa from empresa where nombre_empresa = = '".$nombre."' ";
		$res = mysql_query($sql) or die(mysql_error());
		
		if (mysql_num_rows($res) > 0) {
			$existe = true;
			$existeJSON = array('existe' => $existe,
				'nombre' => $nombre_completo );
			print(json_encode($existeJSON));
		}
			//REALIZAMOS LA CONSULTA
		$consulta = "insert into empresa(nombre_empresa,rfc,calle,numero,colonia,ciudad,estado,telefono,celular,email,web) values('".$nombre."','".$rfc."','".$calle."','".$num."','".$col."','".$city."','".$edo."','".$tel."','".$cel."','".$email."','".$web."')";
			//EJECUTAMOS LA CONSULTA
		$resultado = mysql_query($consulta)or die(mysql_error());

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
 ?>