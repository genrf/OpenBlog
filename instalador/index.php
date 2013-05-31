<?php
	include_once '../autoloader.php';

	use src\helpers\Header;
	use src\helpers\ManejadorBD;
  	use src\helpers\pathGen;
	pathGen::cargarRaiz();
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<title>OpenBlog</title>
	<link rel="shortcut icon" href="<?php echo pathGen::pathIco("favicon.ico") ?>">
	<link href="<?php echo pathGen::pathCss('fuentes.css') ?>" rel="stylesheet">
	<link href="<?php echo pathGen::pathCss('bootstrap.css') ?>" rel="stylesheet">
	<link href="<?php echo pathGen::pathCss('instalador.css') ?>" rel="stylesheet">
</head>

<body>
	<div class="contenedor">
		<div class="seccion header">
                        <h4>Si necesitas ayuda visita <a href="http://www.openblog.com/help" target="_blank" >http://www.openblog.com/help</a></h4>
			<h1>Instalador OpenBlog<img src="<?php echo pathGen::loadLogo() ?>"></h1>
                        <div class="cajaAlertas" style="display:none"></div>
		</div><!-- /header -->
		<div class="seccion main">
			<div class="cajaMain">
				CONTENIDO
			</div>
		</div>	<!-- /main Section -->

		<div class="seccion footer">
			<div class="cajaBotonesFooter">
				<a class="btn btn-big" id="botonAnterior">Anterior</a>
				<a class="btn btn-big" id="botonSiguiente">Siguiente</a>
			</div>
		</div><!-- /footer -->
	</div> <!-- /contenedor -->

   <!-- Le javascript
   ================================================== -->
   <!-- Placed at the end of the document so the pages load faster -->
   <script src="<?php echo pathGen::pathJs("jquery.js") ?>"></script>
   <script src="<?php echo pathGen::pathJs("bootstrap.js") ?>"></script>
   <script src="<?php echo pathGen::pathJs("instalador.js") ?>"></script>
</body>
</html>

