<?php
namespace src\entidades;
class Post {
    
    private $id;
    private $idUsuario;
    private $idCategoria;
    private $titulo;
    private $texto;
    private $fechaCreacion;
    private $fechaModificacion;
    private $modificaciones;
    
    public function __construct($id, $idUsuario, $idCategoria, $titulo, $texto, $fechaCreacion, $fechaModificacion, $modificaciones) {
        $this->id = $id;
        $this->idUsuario = $idUsuario;
        $this->idCategoria = $idCategoria;
        $this->titulo = $titulo;
        $this->texto = $texto;
        $this->fechaCreacion = $fechaCreacion;
        $this->fechaModificacion = $fechaModificacion;
        $this->modificaciones = $modificaciones;
    }
    
    public function getId(){
        return $this->id;
    }
    
    public function getIdUsuario(){
        return $this->idUsuario;
    }
    
    public function getIdCategoria(){
        return $this->idCategoria;
    }
    
    public function getTitulo(){
        return $this->titulo;
    }
    
    public function getTexto(){
        return $this->texto;
    }
    
    public function getFechaCreacion(){
        return $this->fechaCreacion;
    }
    
    public function getFechaModificacion(){
        return $this->fechaModificacion;
    }
    
    public function getModificaciones(){
        return $this->modificaciones;
    }
    
    public function setId($id){
        $this->id = $id;
    }
    
    public function setIdUsuario($idUsuario){
        $this->idUsuario = $idUsuario;
    }
    
    public function setIdCategoria($idCategoria){
        $this->idCategoria = $idCategoria;
    }
    
    public function setTitulo($titulo){
        $this->titulo = $titulo;
    }
    
    public function setTexto($texto){
        $this->texto = $texto;
    }
    
    public function setFechaCreacion($fechaCreacion){
        $this->fechaCreacion = $fechaCreacion;
    }
    
    public function setFechaModificacion($fechaModificacion){
        $this->fechaModificacion = $fechaModificacion;
    }
    
    public function setModificaciones($modificaciones){
        $this->modificaciones = $modificaciones;
    }
}

?>