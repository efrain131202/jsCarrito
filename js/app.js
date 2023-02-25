// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let elementosCarrito = []

const agregarCurso = (e) => {
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const id = e.target.getAttribute('data-id');
        const card = e.target.parentElement.parentElement;
        //Verificar si elemento ya existe
        const existe = elementosCarrito.some(item => item.id === id);
        if(existe){
            const libro = elementosCarrito.map(item => {
                if(item.id === id) libro.cant++;
                return item;
            })
            elementosCarrito = libros;
        }else {
            const infoCard = leerInfo(card);
            elementosCarrito.push({...infoCard, id: id});
        }    
        llenaCarrito(elementosCarrito);
    }
}

const leerInfo = card => {
        const title = card.querySelector('h4').innerText;
        const precio = card.querySelector('.precio span').innerText;
        const imagen = card.querySelector('img').src;
        return {
            name: title, 
            price: precio,
            image: imagen,
            cant: 1
        };
}

const llenaCarrito = elementosCarrito => {
    contenedorCarrito.innerHTML = '';
    elementosCarrito.forEach(item => {
        const filaTabla = document.createElement('tr');
        const contFila =
        `<td><img src='${item.image}' width=100></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.cant}</td>
        <td><a href="#" data-id="${item.id}" class="borrar-curso">X</a></td>
        `;
        filaTabla.innerHTML = contFila;
        filaTabla.setAttribute('data-id', item.id);
        contenedorCarrito.appendChild(filaTabla);
    })
}

const eliminarCurso = (e) => {
    e.preventDefault();
    if(e.target.classList.constains('borrar-curso')){
        const id = e.target.getAttribute('data-id');
        elementosCarrito = elementosCarrito.filter(item => item.id !== id);
        llenaCarrito(elementosCarrito);
    }
}

const vaciarCarrito = () => {
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


listaCursos.addEventListener('click', agregarCurso);
carrito.addEventListener('click', eliminarCurso);