<?php 
	function conectarse(){
		$conecta = mysql_connect("localhost","root","") or die(mysql_error());

		if (!is_resource($conecta)) {
			echo "Fallo la Conexion al Servidor";
		} else {
		$db = mysql_select_db("venta_libros",$conecta);
		if ($db == 0) {
			echo "Error al Conectar en la Base de Datos";
			}
		}
	}
 ?>