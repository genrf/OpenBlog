<?php
namespace src\entidades;
class Rol {
    
    private $id;
    private $nombre;
    private $descripcion;
    
    public function __construct() {
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getNombre(){
        return $this->nombre;
    }
    
    public function getDescripcion(){
        return $this->descripcion;
    }
    
    public function setId($id){
        $this->id = $id;
    }
    
    public function setNombre($nombre){
        $this->nombre = $nombre;
    }
    
    public function setDescripcion($descripcion){
        $this->descripcion = $descripcion;
    }
}

?>
