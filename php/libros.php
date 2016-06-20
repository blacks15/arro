<?php 
	require_once('conexion.php');
	header('Content-Type: application/json');

	error_reporting(0);
	conectarse();

	$opc = $_POST['opc'];

	switch ($opc) {
		case 'guardar_libro':
			guardar_libro();
		break;

		case 'buscar_libro':
			buscar_libro();
		break;

		case 'modificar_libro':
			modificar_libro();
		break;
	}

	function modificar_libro(){
		parse_str($_POST["cadena"], $_POST);
		$codigo = trim($_POST['codigo']);
		$name = trim($_POST['nombre']);
		$isbn = trim($_POST['isbn']);
		$autor = trim($_POST['autor']);
		$editorial = trim($_POST['editorial']);
		
		$sql = "update libros set clave_libro = '".$codigo."',nombre_libro = '".$name."',
		isbn = '".$isbn."',autor = '".$autor."',editorial = '".$editorial."',
		where clave_libro = '".$codigo."' ";
		$resultado = mysql_query($sql) or die(mysql_error());

		if ($resultado == true) {
			$respuesta = true;
			$salidaJSON = array('respuesta' => $respuesta );
			print json_encode($salidaJSON);
		} else {
			$fallo = true;
			$falloJSON = array('fallo' => $fallo);
			print(json_encode($falloJSON));
		}
	}

	function buscar_libro(){
		$bu = trim($_POST['bu']);
		if (!empty($bu)) {
			$sql = "select clave_libro,nombre_libro,autor,editorial
                	from libros 
        			where clave_libro =".$bu." ";
	        $resultado = mysql_query($sql) or die(mysql_error());
	        $contar = mysql_num_rows($resultado);
	        if($contar == 0){
	        	$noexiste = true;
		       	$noexisteJSON = array('noexiste' => $noexiste);
		       	print(json_encode($noexisteJSON));
	        } else {
	           while($row = mysql_fetch_array($resultado)){
              	$respuesta->id = $row['clave_libro'];
                $respuesta->nombre = utf8_encode($row['nombre_libro']);
                $respuesta->autor = utf8_encode($row['autor']);
                $respuesta->editorial = utf8_encode($row['editorial']);
              }
	        	print(json_encode($respuesta));
	         } 
		} else {
				echo json_encode("Vacio");
			}
	}

	function guardar_libro(){
		parse_str($_POST["cadena"], $_POST);
		$name = trim($_POST['nombre']);
		$isbn = trim($_POST['isbn']);
		$genero = trim($_POST['genero']);
		$autor = trim($_POST['autor']);
		$editorial = trim($_POST['editorial']);

			//COMPROBAMOS SI EXISTE EL LIBRO
		$sql = "select * from libros where nombre_libro = '".$name."' or isbn = '".$isbn."' ";
		$res = mysql_query($sql) or die(mysql_error());
		if (mysql_num_rows($res) > 0) {
			$existe = true;
			$existeJSON = array('existe' => $existe);
			print(json_encode($existeJSON));
		} else {
				//REALIZAMOS LA CONSULTA
			$consulta = "insert into libros (clave_libro,nombre_libro,autor,editorial)
			 values ('".$isbn."','".$name."','".$autor."','".$editorial."')";
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