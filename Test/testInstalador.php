<?php
    require_once("../Helpers/Instalador.php");
    $instalador = new Instalador();
    $instalador->borrarEstructuraTablas();
    $instalador->crearEstructuraTablas();
?>