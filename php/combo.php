<?php 
	/*Incluimos el fichero de la clase Db*/
	require_once('conexion.php');
	conectarse();

	header('Content-Type: application/json');
	error_reporting(0);
	session_start();

	$opciones = null;
	$opciones->opcion_autor = '';
	$opciones->opcion_editorial = '';
	$opciones->opcion_genero = '';
	$opciones->opcion_proveedor = '';

	mostrar_autor();
	mostrar_editorial();
	mostrar_genero();

	$opc = $_GET['opc'];

	switch ($opc) {
		case 'proveedor':
			mostrar_proveedor();
		break;
	}

	function mostrar_autor(){
		global $opciones;
		$opcion_autor = '<option value="0">SELECCIONE</option>';
		$consulta = "select nombre_autor,clave_autor from autores group by nombre_autor";
		$resultado = mysql_query($consulta) or die(mysql_error());

		while ($fila = mysql_fetch_array($resultado)) {
		 	$opcion_autor.= '<option value = "'.$fila["clave_autor"].'">'.utf8_encode($fila["nombre_autor"]).'</option>';
		 }
		 mysql_free_result($resultado);
		 $opciones->opcion_autor = $opcion_autor;
	}

	function mostrar_editorial(){
		global $opciones;
		$opcion_editorial = '<option value="0">SELECCIONE</option>';
		$consulta = "select clave_editorial,nombre_editorial from editoriales group by nombre_editorial";
		$resultado = mysql_query($consulta) or die(mysql_error()); 

		while ($fila = mysql_fetch_array($resultado)) {
		 	$opcion_editorial.= '<option value = "'.$fila["clave_editorial"].'">'.utf8_encode($fila["nombre_editorial"]).'</option>';
		 }
		 mysql_free_result($resultado);
		 $opciones->opcion_editorial = $opcion_editorial;
	}

	function mostrar_genero(){
		global $opciones;
		$opcion_genero = '<option value="0">SELECCIONE</option>';
		$consulta = "select clave_genero,nombre_genero from generos";
		$resultado = mysql_query($consulta) or die(mysql_error()); 

		while ($fila = mysql_fetch_array($resultado)) {
		 	$opcion_genero.= '<option value = "'.$fila["clave_genero"].'">'.$fila["nombre_genero"].'</option>';
		 }
		 mysql_free_result($resultado);
		 $opciones->opcion_genero = $opcion_genero;
	}
	function mostrar_proveedor(){
			global $opciones;
			$opcion_proveedor = '<option value="0">SELECCIONE </option>';
			$consulta = "select clave_proveedor,nombre_proveedor from proveedores where status = 'ACTIVO'";

			$resultado = mysql_query($consulta) or die(mysql_error());
			 while ($fila = mysql_fetch_array($resultado)) {
			 	$opcion_proveedor.= '<option value = "'.$fila["clave_proveedor"].'">'.$fila["nombre_proveedor"].'</option>';
			 }
			 mysql_free_result($resultado);
			 $opciones->opcion_proveedor = $opcion_proveedor;
	}		

	print json_encode($opciones);


?>