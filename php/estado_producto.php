<?php 
	require_once('conexion.php');
	header('Content-Type: application/json');
	error_reporting(0);
	require_once ('Conf.class.php');
	$bd = Db::getInstance();
		//ASIGNAMOS EL GRID A VARIABLE Y LO DECODIFICAMOS
	$json = trim($_POST['detalle']);
	$detalle = json_decode($json,true);
		//RECCOREMOS EL ARRAY 
	foreach ($detalle as $key => $value){
		$sql = "select cantidad_actual from productos 
			where clave_producto = '".$value['clave_producto']."' ";
				//EJECUTAMOS LA CONSULTA
		$resultado = mysql_query($sql) or die(mysql_error());	
			//RECORREMOS LA CONSULTA PARA VERIFICAR LA CANTIDAD DEL PRODUCTO
		while ($row = mysql_fetch_array($resultado)){
				//SI LA CANTIDAD ES MENOS A 0 ACTUALIZAMOS EL ESTADO DEL PRODUCTO
			if ($row['cantidad_actual'] == 0){
				$sql2 = "update productos set status = 'AGOTADO' 
					where clave_producto = '".$value['clave_producto']."' ";
						//EJECUTAMOS LA COSULTA
				$ok = mysql_query($sql2) or die(mysql_error());
				if ($ok == true){
					$respuesta = true;
					$salidaJSON = array('respuesta' => $respuesta);
					print(json_encode($salidaJSON));
				}			
			} else {
				$salidaJSON = array('respuesta' => false);
				print(json_encode($salidaJSON));
			}// END FIRST IF
		}// END WHILE
	}//END FOREACH
 ?>