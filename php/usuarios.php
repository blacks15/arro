<?php

	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	conectarse();

	$opc = $_POST["opc"];
	switch ($opc) {
		case 'inicio_sesion':
			inicio_sesion();
		break;
		
		case 'guardar_usuario':
			guardar_usuario();
		break;

		case 'buscar_usuario':
			buscar_usuario();
		break;

	}

	function inicio_sesion(){
			//RECIBIMOS EL SERIALIZE() Y LO ASIGNAMOS A VARIABLES
		parse_str($_POST["cadena"], $_POST);

		$usuario = trim($_POST['username']);
		$pass = trim($_POST['password']);
		$respuesta = false;

		$consulta = "select matricula,nombre_usuario,password from usuarios WHERE nombre_usuario = '".$usuario."'  ";
		
		$resultado = mysql_query($consulta) or die(mysql_error());
		$count = mysql_num_rows($resultado);
		
		if ($usuario == 'admin' && $pass == 'admin') {
			$respuesta = true;
			session_start();
			$_SESSION['autentificado'] = "si";
			$_SESSION['username'] = 'administrador';
			$_SESSION['start'] = time();
			$_SESSION['expire'] = $_SESSION['start'] + (5 * 60) ;
			$salidaJSON = array('respuesta' => $respuesta,
								'usuario' => $_SESSION['username']);
			print(json_encode($salidaJSON));
		} else {
			if ($count == 1) {
				$row = mysql_fetch_array($resultado);
				$user = $row['nombre_usuario'];
				$id = $row['matricula'];
				if ((password_verify($pass,$row['password'])) && ($usuario == $user) ) {
						$respuesta = true;
						session_start();
						$_SESSION['autentificado'] = "si";
						$_SESSION['id'] = $row['matricula'];
						$_SESSION['username'] = $row['nombre_usuario'];
						$_SESSION['tipo'] = $row['tipo'];
						$_SESSION['start'] = time();
						$_SESSION['expire'] = $_SESSION['start'] + (8 * 60) ;
						$salidaJSON = array('respuesta' => $respuesta,
											'usuario' => $_SESSION['username']);
						print(json_encode($salidaJSON));
					} else {
						$fallo = true;
						$falloJSON = array('fallo' => $fallo );
						print json_encode($falloJSON);
					}
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo );
				print json_encode($falloJSON);
			}
		}
	}

	
	function guardar_usuario(){
		parse_str($_POST["cadena"], $_POST);
		$matricula = trim($_POST['codigo']);
		$usuario = trim($_POST['usuario']);
		$pass = trim($_POST['pass']);
		$estado = 'ACTIVO';
			//DAMOS FORMATO A LA FECHA
		$hoy = date("F j, Y, g:i ");   
		$fecha = date('Y-m-d H:i:s',strtotime($hoy));
		$respuesta = false;
			//HACEMOS UN HASH A LA CONTRASEÑA
		$clave = password_hash($pass, PASSWORD_DEFAULT);

			//VALIDAMOS SI EXISTE EL USUARIO
		$sql = "select * from usuarios where matricula = '".$matricula."' or nombre_usuario = '".$usuario."' ";
		$res = mysql_query($sql) or die(mysql_error());
		if (mysql_num_rows($res) > 0) {
			$existe = true;
			$existeJSON = array('existe' => $existe);
			print(json_encode($existeJSON));
		} else {
			$consulta = "insert into usuarios (matricula,nombre_usuario,password,status,fecha_creacion)
			 values('".$matricula."','".$usuario."','".$clave."','".$estado."','".$fecha."')";
				//EJECUTAR CONSULTA
			$resultado = mysql_query($consulta) or die(mysql_error());

			if ($resultado == true){
				$respuesta = true;
				$salidaJSON = array('respuesta' => $respuesta );
				print json_encode($salidaJSON);
			} else {
				$fallo = true;
				$falloJSON = array('fallo' => $fallo );
				print json_encode($falloJSON);
			}
		}
}

	function buscar_usuario(){
		$respuesta = false;
		$usuario   = $_POST['user'];

		$consulta = "select * from usuarios where nombre_usuario = '".$usuario."'";
		$resultado = mysql_query($consulta) or die(mysql_error());
		if(mysql_num_rows($resultado) > 0){
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta);
			print (json_encode($salidaJSON));
		} else {
			$respuesta = false;
			$salidaJSON = array('respuesta' => $respuesta);
			print(json_encode($salidaJSON));
		}
		
	}
	
?>