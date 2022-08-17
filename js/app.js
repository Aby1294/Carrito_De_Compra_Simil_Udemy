//Variables (se recomiendo primero poner todas las variables)
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []//creo una variable con "let" xq se va ir modificando y el Array esta vacio xq se va a llenar conforme se agreguen cursos al carrito

//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//

//recomendable tener una Funcion para cargar los eventos despues de las variables (EventListener)
cargarEventListeners()
function cargarEventListeners(){
    //Cuando agregas un curso presiuonando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []//reseteamos el arreglo

       
    })
}


//---------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//

//Funciones
function agregarCurso(evento){//Esto significa que si preciono el boton 
    evento.preventDefault()//preventDefault previene la accion por default, en este caso que valla al inicio cada ves q se precione el botn agregar al carrito
   
    //Si preciono el boton agregar-carrito hacer...
    if(evento.target.classList.contains('agregar-carrito')){//La propiedad event.target puede ser usada para implementar una delegación del evento. (En este caso el botón "agregar-carrito").
                                                            //Usar classList es una forma práctica de acceder a la lista de clases de un elemento como una cadena de texto delimitada por espacios a través de element.className. 
                                                            //El método contains() de la interfaz DOMTokenList devuelve un valor booleano      
         //parentElement es para ir al elemento padre, es este caso es padre del padre xq va dos veces
         const cursoSeleccionado = evento.target.parentElement.parentElement  
         leerDatosCurso(cursoSeleccionado)         
         
    }
}

//---------------------------------------------------------------------------------------------------------------------------------//

//Eliminar un curso del carrito
function eliminarCurso(evento){
    //Si precione el boton "borrar-curso"
    if(evento.target.classList.contains('borrar-curso')){
        //Creo la constante cursoId para obtener el ID de cada articulo
        // console.log(evento.target.getAttribute('data-id')) //Ver por consola si obtengo el ID
        const cursoId= evento.target.getAttribute('data-id')
    //Y Elimina del arreglo de articulosCarrito por el data-id - Filter es un metodo de JS para eliminar, existen mas
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

    carritoHTML()//Interar sobre el carrito y mostrar su HTML
    
    }

}

//---------------------------------------------------------------------------------------------------------------------------------//


//Funcion que lee el conetido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(cursoSeleccionado){//puedo colocar "cursoSeleccionado" o cualquer nombre, siempre y cuando sepa a que onjeto se esta llamando
    //console.log(cursoSeleccionado)

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
    imagen: cursoSeleccionado.querySelector('img').src,
    titulo: cursoSeleccionado.querySelector('h4').textContent,
    precio: cursoSeleccionado.querySelector('.precio span').textContent,
    id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
    cantidad: 1
    }

    //Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( cursoSeleccionado => cursoSeleccionado.id === infoCurso.id )
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(cursoSeleccionado => {
            if (cursoSeleccionado.id === infoCurso.id) {
                cursoSeleccionado.cantidad++
                return cursoSeleccionado //retorna el objeto actualizado
            }else{
                return cursoSeleccionado //retorna los objetos q no son los duplicados
            }
        })
        articulosCarrito = [...cursos]
    }else{
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]//llamo a la varible "articulosCarrito", dentro del array creo una copia del mismo, esto permite no perder la referencia (lista) a los cursos ya agregados
    }

    console.log(articulosCarrito)

    carritoHTML()

}


//---------------------------------------------------------------------------------------------------------------------------------//


//apependChild El nuevo nodo se incluye inmediatamente después de los hijos ya existentes —si hay alguno— y el nodo padre cuenta con una nueva rama.

//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML()

    //Recorre el carrit oy genera el HTML
    articulosCarrito.forEach( curso => {
        // const row = document.createElement('tr') //Row devuelve una colección de todos los elementos <tr> de una tabla.
       //innerHTML se puede usar para escribir una tabla completa o el contenido de una celda
        // row.innerHTML = 
        // `
        // <td><img src= "${curso.imagen}" width="100"> </td>
        // <td> ${curso.titulo} </td>
        // <td>${curso.precio} </td>
        // <td>${curso.cantidad} </td>
        // <td>
        //     <a href="#" class="borrar-curso" data-id="${curso.id}" >
        // </td>
        // `
        
        //Mejoramos el codigo con Destructuring
        const {imagen, titulo, precio, cantidad, id}=curso

        const row = document.createElement('tr')       
        row.innerHTML = 
        `
        <td><img src= "${imagen}" width="100"> </td>
        <td> ${titulo} </td>
        <td>${precio} </td>
        <td>${cantidad} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" >
        </td>
        `
        //Agregar el HTML del carrito en el body
        contenedorCarrito.appendChild(row)
    })

    
}


//---------------------------------------------------------------------------------------------------------------------------------//


function limpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML=''

    //Forma correcta
    while (contenedorCarrito.firstChild) {//Mientras exista un hijo
        //El elemento padre eliminara un hijo por el primero, hasta q solo quede un hijo
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}