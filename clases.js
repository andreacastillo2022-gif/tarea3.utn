// CLASE
class Tarea {
    constructor(id, titulo) {
        this.id = id;
        this.titulo = titulo;
        this.completada = false;
    }

    toggleEstado() {
        this.completada = !this.completada;
    }
}

// constructor y  metodo
class GestorTareas {
    constructor() {
        this.tareas = []; //array donde van las tareas
        this.nuevoId = 1;
        //contador que empieza en 1
    }

    agregarTarea(titulo) {
        const nueva = new Tarea(this.nuevoId, titulo);
        this.tareas.push(nueva);
        this.nuevoId ++;
    }

    listarTareas() {
        this.tareas.forEach(t => console.log(`ID: ${t.id} , ${t.titulo} , Completada: ${t.completada}`));
    }

    buscarPorTitulo(titulo) {
        return this.tareas.find(t => t.titulo === titulo);
    }
}  // return puede estar implicito???? no sé si es necesario

//fetch en archivo local tareas.json
async function cargarTareas() {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const respuesta = await fetch("tareas.json");
    const data = await respuesta.json();
    return data
}


//Programa principal 
async function main() {
    const gestor = new GestorTareas();

    const tareasIniciales = await cargarTareas();
    console.log("Tareas cargadas correctamente.");

    tareasIniciales.forEach(t => {
        const tarea = new Tarea(t.id, t.titulo);
        tarea.completada = t.completada;
        gestor.tareas.push(tarea);

    });

    gestor.nuevoId = gestor.tareas.length + 1;
    //busque alguna solución para que vaya en 1,2,3,4 porque sino volvia a 1 cuando pasaba el 3

    console.log("Lista inicial:");
    gestor.listarTareas();

    gestor.agregarTarea("Estudiar para el examen");
    console.log("Lista actualizada:");
    gestor.listarTareas();

    const completadas = gestor.tareas.filter(t => t.completada);
    console.log("Tareas completadas:");
    console.table(completadas);

    const titulos = gestor.tareas.map(t => t.titulo); 
    console.log("Solo titulos");
    console.log(titulos);
}

main();  
