<?php
	include '../../autoloader.php';

	use src\helpers\ManejadorBD;
	use src\helpers\Header;
	use src\entidades\Post;

	if(!isset($_POST) || empty($_POST)){
		Header::mostrarPaginaError('Se ha encontrado un error con la peticion');
	}

	$mbd = new ManejadorBD(Header::cargarJSON());
	
	$post = $_POST['post'];
	//$post = json_decode($_POST['post'],true); // el true hace que convierta el json en array

	$antiguoPost = $mbd->getPost($post['id']);

	$nuevoPost = new Post();

	$nuevoPost->setId($antiguoPost->getId());	//el id no cambia

	$nuevoPost->setTexto($antiguoPost->getTexto()); // El texto lo cambiamos en el otro archivo

	$nuevoPost->setModificaciones($antiguoPost->getModificaciones());

	$nuevoPost->setFechaCreacion($antiguoPost->getFechaCreacion());

	$nuevoPost->setFechaModificacion($antiguoPost->getFechaModificacion());

	if(!empty($post['titulo']))
		$nuevoPost->setTitulo($post['titulo']);
	else
		$nuevoPost->setTitulo($antiguoPost->getTitulo());

	if(!empty($post['idCategoria']))
		$nuevoPost->setIdCategoria($post['idCategoria']);
	else
		$nuevoPost->setIdCategoria($antiguoPost->getIdCategoria());	

	if(!empty($post['idUsuario']))
		$nuevoPost->setIdUsuario($post['idUsuario']);
	else
		$nuevoPost->setIdUsuario($antiguoPost->getIdUsuario());

	if($mbd->updatePost($nuevoPost->getId(), $nuevoPost)){
		echo true;
	}else{
		echo false;
	}
?>