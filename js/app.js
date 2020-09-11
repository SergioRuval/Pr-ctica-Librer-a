const autor = document.getElementById("inputAutor");
const titulo = document.getElementById("inputTitulo");
const tabla = document.getElementById("tbody");
const inputBuscar = document.getElementById("inputBuscar");

const libro = new Libro();

const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,100}$/;

function eventListener(){
    document.getElementById("btnAdd").addEventListener("click",prepararLibro);
    tabla.addEventListener("click",acciones);
    document.getElementById("btnVaciar").addEventListener("click",vaciarLibreria);
    document.getElementById("buscarLibro").addEventListener("click",buscarLibro);
}

eventListener();
prepararDom();

function prepararLibro(){

    let arrayLibros = LocalStorageOperation.obtenerLS();
    let bandera = false;

    for(let i = 0; i < arrayLibros.length; i++){
        if(titulo.value.trim().toLowerCase() == arrayLibros[i].titulo.trim().toLowerCase() && autor.value.trim().toLowerCase() == arrayLibros[i].autor.trim().toLowerCase()){
            bandera = true;
            break;
        }
    }

    if((autor.value != "" && titulo.value != "") && (patern.test(autor.value) && patern.test(titulo.value)) && !bandera ){
        let ultimoId = LocalStorageOperation.ultimoId();

        const infoLibro = {
            id: ++ultimoId,
            titulo: titulo.value.trim(),
            autor: autor.value.trim(),

        }
        
        let tr = libro.agregar(infoLibro);
        tabla.appendChild(tr);
        LocalStorageOperation.almacenarLibro(infoLibro);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha agregado el libro',
            showConfirmButton: false,
            timer: 1000
          })
        autor.value = "";
        titulo.value = "";
    }else if(bandera){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Libro ya existente',
            showConfirmButton: false,
            timer: 1000
          })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Datos no válidos',
            showConfirmButton: false,
            timer: 1000
          })
    }
    
    
}

function acciones(event){
    if(event.target.tagName === 'I' || event.target.tagName === 'BUTTON'){
        if(event.target.className.includes("btn-warning") || event.target.className.includes("fa-trash")){
            libro.eliminar(event.target);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Libro eliminado',
                showConfirmButton: false,
                timer: 1000
              })
        }
        // libro.eliminar(event.target.tagName);
    }
}

function prepararDom(){
    const librosLS = LocalStorageOperation.obtenerLS();
    // console.log(librosLS);

    for(let i = 0; i < librosLS.length; i++){
        // console.log("instancia " + i);
        const instanciaLibro = new Libro();
        tabla.appendChild(instanciaLibro.agregar(librosLS[i]));
    }
}

function vaciarLibreria(){
    // console.log(tabla.firstChild);
    while(tabla.firstChild){
        tabla.firstChild.remove();
    }
    LocalStorageOperation.borrarLocalStorage();
}

function buscarLibro(event){
    event.preventDefault();
    if(inputBuscar.value != ''){
        let resultado = LocalStorageOperation.buscarTitulo(inputBuscar.value.trim().toLowerCase());
        if(resultado != ''){
            Swal.fire(
                'Búsqueda Exitosa',
                `El libro "${resultado.titulo}", con id ${resultado.id} y de autor ${resultado.autor}`,
                'success'
            )
        }else{
            Swal.fire(
                'Sin Resultados',
                `No existe un libro con título ${inputBuscar.value}`,
                'error'
            )
        }
        inputBuscar.value = "";
    }
}