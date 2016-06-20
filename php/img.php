<?php 
	header('Content-Type: application/json');
	error_reporting(0);

	$name = trim($_POST['name']);
	$upload_folder = '../images';
	$nombre_archivo = $_FILES['archivo']['name'];
	$tipo_archivo = $_FILES['archivo']['type'];
	$tamano_archivo = $_FILES['archivo']['size'];
	$tmp_archivo = $_FILES['archivo']['tmp_name'];
	$tipo = stristr($nombre_archivo,'.');
	$nombre = $name.$tipo;
	$nombre = strtolower($nombre);
	$nombre = rtrim($nombre);
	$archivador = $upload_folder . '/' . $nombre;

	if (!move_uploaded_file($tmp_archivo, $archivador)) {
		$respuesta = false;
		$return = array('respuesta' => $respuesta);
		print(json_encode($return));
		exit();
	} else {
		$respuesta = true;
		$return = array('respuesta' => $respuesta);
		print(json_encode($return));
	}
 ?>