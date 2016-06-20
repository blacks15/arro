<?php
  require_once('conexion.php');
  header('Content-Type: application/json');
  error_reporting(0);
  
  conectarse();
  	//CREARMOS UN ARREGLO CON LOS DATOS
  $post = array(
    'limit'=>(isset($_REQUEST['rows']))?$_REQUEST['rows']:'',
    'page'=>(isset($_REQUEST['page']))?$_REQUEST['page']:'',
    'orderby'=>(isset($_REQUEST['sidx']))?$_REQUEST['sidx']:'',
    'orden'=>(isset($_REQUEST['sord']))?$_REQUEST['sord']:'',
    'search'=>(isset($_REQUEST['_search']))?$_REQUEST['_search']:'',
  );
  $se = "";
     //CREAMOS LA CONSULTA DE BUSQUEDA
  if($post['search'] == 'true'){
    $b = array();
     //CREAMOS LA FUNCIÓN CON LOS ELEMENTOS A BUSCAR POR LIKE
    $search['like'] = elements(array('nombre_libro,autor,editorial'),$_REQUEST);
     //HACIENDO UN RECORRIDO SOBRE ELLOS CREAMOS LA CONSULTA.
	foreach($search['like'] as $key => $value){
		if($value != false) {
			$b[] = "$key like '%$value%' ";
      }
    }
       //CREAMOS LA FUNCIÓN CON LOS ELEMENTOS A BUSCAR CON WHERE
    $search['where'] = elements(array('nombre_libro,autor,editorial'),$_REQUEST);
        //HACIENDO UN RECORRIDO SOBRE ELLOS CREAMOS LA CONSULTA.
	foreach($search['where'] as $key => $value){
		if($value != false) { 
			$b[]="$key = '$value'";
		}
    }
        //CREAMOS LA CONSULTA WHERE
    $se = "where ".implode(' or ',$b );   
  }
		//REALIZAMOS LA CONSULTA PARA SABER EL NÚMERO DE REGISTROS CON EL FILTRO
	$query = mysql_query("select count(*) as t from libros".$se);
	if(!$query){
	echo mysql_error();
	} 
	$count = mysql_result($query,0);
	if( $count > 0 && $post['limit'] > 0) {
      //CALCULAMOS EL NÚMERO DE PÁGINAS QUE TIENE EL SISTEMA
    	$total_pages = ceil($count/$post['limit']);
		if ($post['page'] > $total_pages) {
    		$post['page'] = $total_pages;
    	}
  			//CALCULAMOS EL OFFSET PARA LA CONSULTA MYSQL
		$post['offset'] = $post['limit'] * $post['page'] - $post['limit'];
	} else {  
    	$total_pages = 0;
    	$post['page'] = 0;
    	$post['offset'] = 0;
  	}
	if (!$se) {
			//CREAMOS LA CONSULTA PARA SER ENVIADA PERO SIN EL FILTRO
    	$sql = "select l.clave_libro,nombre_libro,nombre_autor as autor,nombre_editorial as editorial
			from libros l
			inner join autores a on a.clave_libro = l.clave_libro
			inner join editoriales e on e.clave_libro = l.clave_libro";
		if( !empty($post['orden']) && !empty($post['orderby']) ) {
				//AÑADIMOS ORDER BY PARA ORDENAR LA CONSULTA
			$sql.= " ORDER BY $post[orderby] $post[orden] ";
			if($post['limit'] && $post['offset']) {
				$sql.=" limit $post[offset], $post[limit]";
			} else if($post['limit']) { 
				//AÑADIMOS EL LIMITE PARA SACAR LAS FILAS DE LA PÁGINA ACTUAL
				$sql.= "limit 0,$post[limit]";
			}
		}
			//EJECUTAMOS LA CONSULTA
		$query = mysql_query($sql);
		if(!$query) {
     	 echo mysql_error();
    	}
	} else {
  			//CREAMOS LA CONSULTA A SER ENVIADA CON EL FILTRO
		$sql ="select l.clave_libro,nombre_libro,nombre_autor as autor,nombre_editorial as editorial
			from libros l
			inner join autores a on a.clave_libro = l.clave_libro
			inner join editoriales e on e.clave_libro = l.clave_libro".$se;
    	if( !empty($post['orden']) && !empty($post['orderby'])) {
        		//AÑADIMOS LA PARTE PARA ORDENAR LA CONSULTA
      		$sql.= " ORDER BY $post[orderby] $post[orden] ";
    		if($post['limit'] && $post['offset']) {
				$sql.=" limit $post[offset], $post[limit]";
			} else if($post['limit']) {
					//AÑADIMOS EL LIMITEPARA SACAR LAS FILAS DE LA PÁGINA ACTUAL
				$sql.=" limit 0,$post[limit]";
			}
		}
			//EJECUTAMOS LA CONSULTA
		$query = mysql_query($sql);
		if(!$query) {
			echo mysql_error();
		}
	}
		//CREAMOS UN ARRAY PARA EL RESULTADO Y UN CONTADOR
	$result = array();
	$i = 0;
		//RECORREMOS EL ARRAY PARA GUARDAR LOS DATOS
	while($row = mysql_fetch_object($query)){
		$result[$i]['clave_libro'] = $row->clave_libro;
		$result[$i]['cell'] = array($row->clave_libro,utf8_encode($row->nombre_libro),utf8_encode($row->editorial),utf8_encode($row->autor));
		$i++;
	}     
		//LIBERAMOS LA CONSULTA
	mysql_free_result($query);
    	//ASIGNAMOS TODO ESTO EN VARIABLES DE JSON,PARA ENVIARLAS AL NAVEGADOR.
	$json->rows = $result;
	$json->total = $total_pages;
	$json->page = $post['page'];
	$json->records = $count;
	print( json_encode($json));

		//FUNCIÓN PARA CREAR ARRAYS DE BUSQUEDA
	function elements($items, $array, $default = FALSE){
		$return = array();
		if ( !is_array($items) ){
			$items = array($items);
		}
		foreach ($items as $item){
			if (isset($array[$item])){
				$return[$item] = $array[$item];
	  		} else {
	  			$return[$item] = $default;
	  		}
		}
		return $return;
	}
?>