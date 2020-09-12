class Libro{
    // Propiedades
    id = 0;
    autor = '';
    titulo = '';

    agregar(infoLibro){
        this.autor = infoLibro.autor;
        this.titulo = infoLibro.titulo;
        this.id = infoLibro.id;

        // console.log(this.id, this.autor, this.titulo);

        const tr = document.createElement("tr");
        tr.setAttribute("id",`${this.id}`)
        tr.innerHTML = `<th scope="row">${this.id}</th>
                        <td>${this.titulo}</td>
                        <td>${this.autor}</td>
                        <td>
                            <div class="btn-group" role="" aria-label="Basic example">
                                <button id="editar${this.id}" type="button" class="btn btn-success" data-toggle="modal" data-target="#modalEdit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button id="eliminar${this.id}" type="button" class="btn btn-warning">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>`

        return tr;
    }

    eliminar(element){
        // element puede tener dos valores ('I', 'BUTTON')
        if(element.tagName === 'I'){
            element.parentElement.parentElement.parentElement.parentElement.remove();
            LocalStorageOperation.borrarLibro(element.parentElement.parentElement.parentElement.parentElement.id);

        }else if(element.tagName === "BUTTON"){
            element.parentElement.parentElement.parentElement.remove();
            LocalStorageOperation.borrarLibro(element.parentElement.parentElement.parentElement.id);
        }
    }

    editarInput(element,editTitulo,editAutor){
        let id = 0;
        if(element.tagName === 'I'){
            id = element.parentElement.parentElement.parentElement.parentElement.id;
            editTitulo.value = LocalStorageOperation.buscarId(id).titulo;
            editAutor.value = LocalStorageOperation.buscarId(id).autor;
        }else if(element.tagName === "BUTTON"){
            id = element.parentElement.parentElement.parentElement.id;
            editTitulo.value = LocalStorageOperation.buscarId(id).titulo;
            editAutor.value = LocalStorageOperation.buscarId(id).autor;
        }
        return id;
    }

    editar(infoLibro){
        document.getElementById(`${infoLibro.id}`).innerHTML = `<th scope="row">${infoLibro.id}</th>
                                                                <td>${infoLibro.titulo}</td>
                                                                <td>${infoLibro.autor}</td>
                                                                <td>
                                                                    <div class="btn-group" role="" aria-label="Basic example">
                                                                        <button id="editar${infoLibro.id}" type="button" class="btn btn-success" data-toggle="modal" data-target="#modalEdit">
                                                                            <i class="fas fa-edit"></i>
                                                                        </button>
                                                                        <button id="eliminar${infoLibro.id}" type="button" class="btn btn-warning">
                                                                            <i class="fas fa-trash"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>`;
    }
}