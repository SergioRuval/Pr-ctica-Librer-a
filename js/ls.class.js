class LocalStorageOperation {
    
    static almacenarLibro(infoLibro){
        let arrayLibros = this.obtenerLS();
        arrayLibros.push(infoLibro);
        // console.log(arrayLibros);
        localStorage.setItem("Libros",JSON.stringify(arrayLibros));
    }

    static obtenerLS(){
        if(localStorage.getItem("Libros") == null){
            // console.log("Vacío");
            return [];
        }else {
            // console.log("Si hay libros");
            return JSON.parse(localStorage.getItem("Libros"));
        }
    }

    static borrarLocalStorage(){
        localStorage.clear();
    }


    static borrarLibro(idLibro){
        // console.log("Se va a eliminar");
        // console.log(idLibro);
        let arrayLibros = this.obtenerLS();
        let arrayNuevo = [];

        for(let i = 0; i < arrayLibros.length; i++){
            // console.log(arrayLibros[i]);
            if(idLibro != arrayLibros[i].id){                
                arrayNuevo.push(arrayLibros[i]);
            }
        }
        // console.log(arrayNuevo);
        localStorage.setItem("Libros",JSON.stringify(arrayNuevo));
    }

    static ultimoId(){
        let arrayLibros = this.obtenerLS();
        if(arrayLibros.length == 0){
            return 0;
        }else{
            return(arrayLibros[arrayLibros.length - 1].id);
        }
    }

    static buscarTitulo(titulo){
        // El título viene de app.js y es el  valor de un input
        // para nuestro método, título será nuestro parámetro de búsqueda

        let arrayLibros = this.obtenerLS();

        let resultado = '';

        // Iteramos nuestro array de libros mediante un ciclo
        for(let i = 0; i < arrayLibros.length; i++){
            if(titulo == arrayLibros[i].titulo.toLowerCase()) {
                resultado = arrayLibros[i];
            }
        }
        return resultado;
    }

    static buscarId(id){
        let arrayLibros = this.obtenerLS();
        let resultado = '';
        for(let i = 0; i < arrayLibros.length; i++){
            if(id == arrayLibros[i].id){
                resultado = arrayLibros[i];
            }
        }
        return resultado;
    }

    static editarLibro(infoLibro){
        let arrayLibros = this.obtenerLS();
        let arrayNuevo = [];
        for(let i = 0; i < arrayLibros.length; i++ ){
            if(infoLibro.id == arrayLibros[i].id){
                arrayNuevo.push(infoLibro);
            }else{
                arrayNuevo.push(arrayLibros[i]);
            }
        }
        localStorage.setItem("Libros",JSON.stringify(arrayNuevo));
    }
}