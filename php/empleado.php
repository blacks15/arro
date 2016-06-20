<?php 
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	require_once ('Conf.class.php');
	$bd = Db::getInstance();

	$opc = $_POST['opc'];

	switch ($opc) {
		case 'guardar_empleado':
			guardar_empleado();
		break;

		case 'buscar_empleado':
			buscar_empleado();
		break;
	}

	function buscar_empleado(){
			//RECIBIMOS EL PARAMETRO A BUSCAR Y COMPROBAMOS SI NO ESTA VACIO
		$bu = trim($_POST['bu']);
		if (!empty($bu)) {
				//REALIZAMOS LA CONSULTA
			$sql = "select matricula,nombre_empleado,apellido_paterno,apellido_materno,
				calle,numero,colonia,ciudad,estado,telefono,celular,sueldo,tipo
            	from empleados 
        		where matricula = '".$bu."' ";
        			//EJECUTAMOS LA CONSULTA
	        $resultado = mysql_query($sql) or die(mysql_error());
	        $contar = mysql_num_rows($resultado);
	        if($contar == 0){
	        	$noexiste = true;
		       	$noexisteJSON = array('noexiste' => $noexiste);
		       	print(json_encode($noexisteJSON));
	        } else {
	        		//RECORREMOS EL ARRAY Y LE ASIGNAMOS LA RESPUESTA
				while ($row = mysql_fetch_array($resultado)){
					$respuesta->id = $row['matricula'];
					$respuesta->nombre = $row['nombre_empleado'];
					$respuesta->apaterno = $row['apellido_paterno'];
					$respuesta->amaterno = $row['apellido_materno'];
					$respuesta->calle = $row['calle'];
					$respuesta->num = $row['numero'];
					$respuesta->col = $row['colonia'];
					$respuesta->city = $row['ciudad'];
					$respuesta->edo = $row['estado'];
					$respuesta->tel = $row['telefono'];
					$respuesta->cel = $row['celular'];
					$respuesta->sueldo = $row['sueldo'];
					$respuesta->tipo = $row['tipo'];
            	}
	        	print(json_encode($respuesta));
	         } 
		} else {
			echo json_encode("Vacio");
		}
	}

	function guardar_empleado(){
			//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);

		global $nombre_completo;		
		$nombre = trim($_POST['nombre']);
		$apaterno = trim($_POST['apaterno']);
		$amaterno = trim($_POST['amaterno']);		
		$calle = trim($_POST['calle']);
		$num = trim($_POST['num']);
		$col = trim($_POST['col']);
		$city = trim($_POST['city']);
		$edo = trim($_POST['edo']);
		$tel = trim($_POST['tel']);
		$cel = trim($_POST['cel']);
		$sueldo = trim($_POST['sueldo']);
		$tipo = trim($_POST['tipo']);
		$estado = 'ACTIVO';
		$respuesta = false;
		$nombre_completo = $nombre .' '.$apaterno.' '.$amaterno;

			//COMPROBAMOS SI EL EMPLEAOD EXISTE
		$sql = "select * from empleados where nombre_empleado = '".$nombre."' and apellido_paterno = '".$apaterno."' and apellido_materno = '".$amaterno."' ";
		-
		$res = mysql_query($sql) or die(mysql_error());
		if (mysql_num_rows($res) > 0) {
			$existe = true;
			$existeJSON = array('existe' => $existe,
				'nombre' => $nombre_completo );
			print(json_encode($existeJSON));
		} else {
				//REALIZAMOS LA CONSULTA
			$consulta = "insert into empleados (nombre_empleado,apellido_paterno,apellido_materno,
			calle,numero,colonia,ciudad,estado,telefono,celular,sueldo,tipo,status) 
			values ('".$nombre."','".$apaterno."','".$amaterno."','".$calle."','".$num."','".$col."'
			,'".$city."','".$edo."','".$tel."','".$cel."','".$sueldo."','".$tipo."','".$estado."')";
				//EJECUTAMOS LA CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());

			if ($resultado == true){
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta,
					'nombre' => $nombre_completo );
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo,
					'nombre' => $nombre_completo );
				print(json_encode($falloJSON));
			}
		}
	}
 ?>