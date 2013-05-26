var editor;
$('.btn.admin').on('click', function(e) {
	
  e.preventDefault();
  var indice = $(this).data('admin');
  /*Obtengo el id del boton, para saber cual se pulsa*/
  //console.log('Click en: '+indice);
  /*Segun el boton pulsado cargamos una opcion u otra.*/
  $cajaLoader = $('.cajaLoader'); // 'cacheamos' cajaLoader para que no tenga que estar buscandolo cada vez
  switch (indice) {
	case "nEntrada": // Nuevo post
	  $cajaLoader.load('paneladmin/nuevaEntrada.php', function(){
		cargarListenersNuevoPost();
		editor = new EpicEditor({
			basePath: 'resources/js/epiceditor'
		}).load();
	  })
	  break;
	case "aEntradas": // Administrar entradas
	  $cajaLoader.load('paneladmin/administrarPosts.php',function(){
	  });
	  break;
	case "aUsuarios": // Administrar usuarios
	  $cajaLoader.load('paneladmin/administrarUsuarios.php',function(){
          cargarAdministrarUsuarios();
      });
	  break;
	case "aCategorias": // Administrar categorías
	  $cajaLoader.load('paneladmin/administrarCategorias.php', function(){
	  	cargarListenersCategoria();
	  });
	  break;
	case "personalizar": // Personalizar
	  $cajaLoader.load('paneladmin/personalizar.php');
	  break;
	case "aCuenta": // Administrar cuenta (mi cuenta)
	  $cajaLoader.load('paneladmin/administrarCuenta.php');
	  break;
	case "aSalir": // Administrar cuenta (mi cuenta)
		// IMPLEMENTAR FUNCION QUE ME LLEVE A INDEX
		goToIndex();
		break;
	default: // Defecto, e Index.
	  $cajaLoader.load('paneladmin/indexAdministrador.php');
  }
});
/*
	Funcion que me manda a index
*/
function goToIndex(){
	/**
	* Funcion encargada de obtener el enlace actual en el panel admin
	* y quitarle 'panelAdmin.php' para volver al indice.
	 */
	var actualHref = $(location).attr('href');
	var hrefRaiz = actualHref.replace('panelAdmin.php', '');
	$(location).attr('href', hrefRaiz);
}

/*
 *	Panel Nuevo Post
 *	IMPORTANTE!
 *	Todos los listeners para las diferentes páginas/paneles del panel de admin hay que cargarlos una vez se haya cargado el php, es decir, cargarlos en un callback despues del LOAD
 *	o en un archivo Javascript que se cargue con el php de ese panel
 */
function cargarListenersNuevoPost(){
  $('#botonNuevoPost').on('click', function(e){
	e.preventDefault();
	editor.preview();
	var texto = $(editor.getElement('previewer').body).find("div").html();
	var titulo = $('.cajaTitulo input').val();
	var idCategoria = $('.cajaCategoria select').val();

	if(!validarNuevoPost(titulo, texto)){
		alert("No puedo dejar ningún campo vacio");
		return false;
	}
	var datosPost = {
		texto : texto,
		titulo : titulo,
		idCategoria : idCategoria
	}
	$.post('paneladmin/nuevoPost.php', datosPost)
		.done(function(data){
			editor.remove(); // Limpiamos el editor de texto si todo va bien
			$('.formNuevoPost').fadeOut(function(){
				$('.formNuevoPost').parent().append(data);
			});
		})
		.fail(function(){
			console.log("fallo");
		})
  });
}
function validarNuevoPost(titulo, texto) {
  if(titulo === "") return false;
  if(texto === "") return false;
  return true;
}
function cargarListenersCategoria(){
	// Mostrar u ocultar div nueva categoria
	$('.botonCrearCategoria').on('click',function(e){
		e.preventDefault();
		var display = $('.cajaFormularioNuevaCategoria').css('display');
		if (display == 'none'){
			$('.cajaFormularioNuevaCategoria').css('display', 'block');
		}
		else{
			$('.cajaFormularioNuevaCategoria').css('display', 'none');	
		}
		
	});
	// Mostrar u ocultar div editar categoria
	$('.botonEditarCategoria').on('click',function(e){
		e.preventDefault();
		var display = $('.cajaFormularioEditarCategoria').css('display');
		var idCategoria = $(this).data('idcategoria');
		if (display == 'none'){
			$('.editarCategoria').attr('data-idcategoria', idCategoria);
			obtenerDatosCategoria(idCategoria);
			$('.cajaFormularioEditarCategoria').css('display', 'block');
		}
		else{
			$('.cajaFormularioEditarCategoria').css('display', 'none');	
		}
		
	});
	// Crear nueva categoria
	$('.crearCategoria').on('click',function(e){
		e.preventDefault();
		var nombre = $('#nombreCategoria').val();
		var descripcion = $('#descripcionCategoria').val();
		var datosCategoria ={
			nombre : nombre,
			descripcion : descripcion
		}
		$.post('paneladmin/nuevaCategoria.php', datosCategoria)
			.done(function(data){
				$('.cajaFormularioNuevaCategoria').css('display', 'none');
				 $cajaLoader.load('paneladmin/administrarCategorias.php', function(){
		  			cargarListenersCategoria();
		  			$('.cajaContenidoCategoria').find('table').before(data);
		  		});			
			})
			.fail(function(){
				console.log('Fallo en el envio de crear una categoria');
			})
	});
	$('.botonBorrarCategoria').on('click', function(e){
		// Cogemos el id de la categoria
		var idCategoria = $(this).data('idcategoria');
		var datosCategoria = {
			id : idCategoria
		}
		$.post('paneladmin/borrarCategoria.php', datosCategoria)
			.done(function(data){
				 $cajaLoader.load('paneladmin/administrarCategorias.php', function(){
		  			cargarListenersCategoria();
		  			$('.cajaContenidoCategoria').find('table').before(data);
		  		});			
			})
			.fail(function(){
				console.log('Fallo en el envio de crear una categoria');
			})		
	});
	$('.editarCategoria').on('click', function(e){
		// Cogemos el id de la categoria
		var id = $(this).data('idcategoria');
		var nombre = $('#editarNombreCategoria').val();
		var descripcion = $('#editarDescripcionCategoria').val();
		var datosCategoria = {
			id : id,
			nombre : nombre,
			descripcion: descripcion
		}
		$.post('paneladmin/editarCategoria.php', datosCategoria)
			.done(function(data){
				 $cajaLoader.load('paneladmin/administrarCategorias.php', function(){
		  			cargarListenersCategoria();
		  			$('.cajaContenidoCategoria').find('table').before(data);
		  		});			
			})
			.fail(function(){
				console.log('Fallo en el envio de crear una categoria');
			})		
	});
}

function obtenerDatosCategoria(idCategoria){
	datosCategoria = {
		id: idCategoria
	};
	datos = $.post('paneladmin/obtenedorCategoria.php', datosCategoria)
			.done(function(data){
				datos =  $.parseJSON(data);
				$('#editarNombreCategoria').val(datos.nombre);
				$('#editarDescripcionCategoria').val(datos.descripcion);
			})
			.fail(function(){
				console.log('Fallo en el envio de crear una categoria');
			})
	return datos;
	
}

function cargarAdministrarUsuarios(){

    $('.botonBorrarUsuario').click(function(){
        if(confirm('¿Está seguro de que desea borrar el usuario?')){
            var idUsuario = $(this).parents('tr').data('idusuario');
            mandarPeticionBorrarUsuario(idUsuario);
        }
    });

    $('.botonEditarUsuario').click(function(){
		var idUsuario = $(this).parents('tr').data('idusuario');
		$('#myModal').modal({});
		$('#myModal .modal-body').load('paneladmin/src/templates/templateFormularioEditarUsuario.php?idUsuario='+idUsuario);




	})
	$('#myModal .btn-primary').click(function(){
		$myForm = $(this).parent().siblings('.modal-body').find('form');
		var datos = $myForm.serializeArray();
		$('#myModal').modal('hide');
		editarUsuario(datos);
	})
	function editarUsuario(datos){
		$.post('paneladmin/src/editarUsuario.php', datos, function(data){
			actualizarAlerta(data);
		  $cajaLoader.load('paneladmin/administrarUsuarios.php',function(){
	          cargarAdministrarUsuarios();
	      });			
		});

	}

	function actualizarAlerta(data){
		$('.cajaAlertas').html(data).show().delay(2000).queue(function(n) {
		  $(this).hide(); n();
		});;
		
	}


	function mandarPeticionBorrarUsuario(idUsuario){
	  $.post('paneladmin/src/borrarUsuario.php',{ idUsuario : idUsuario },function(data){
	      if(data){
	          $('.cajaAlertas').html('<div class="alert alert-success">Se ha eliminado correctamente el usuario</div>').fadeIn('slow');
	          $cajaLoader.load('paneladmin/administrarUsuarios.php',function(){
	              cargarAdministrarUsuarios();
	          });
	      }else{
	          $('.cajaAlertas').html('<div class="alert alert-error">Ha habido un problema intentando borrar el post, vuelva a intentarlo mas tarde</div>').fadeIn('slow');
	      }
	      setTimeout(function(){
	          $('div .alert').fadeOut('slow',function(){
	          });
	      }, 4000);
	  });
	}
}
