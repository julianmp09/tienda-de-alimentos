const productos= [
    // frutas
    {
        id: "banana",
        titulo: "Banana",
        imagen: "./img/frutas/banana.jpg",
        categoria: {
            nombre: "Frutas",
            id: "frutas"
        },
        precio: 500
    },
    {
        id: "cereza",
        titulo: "Cereza",
        imagen: "./img/frutas/cereza.jpg",
        categoria: {
            nombre: "cereza",
            id: "frutas"
        },
        precio: 800
    },
    {
        id: "manzana",
        titulo: "Manzana",
        imagen: "./img/frutas/manzana.jpg",
        categoria: {
            nombre: "manzana",
            id: "frutas"
        },
        precio: 700
    },
    {
        id: "peras",
        titulo: "Peras",
        imagen: "./img/frutas/peras.jpg",
        categoria: {
            nombre: "Peras",
            id: "frutas"
        },
        precio: 900
    },
    {
        id: "naranjas",
        titulo: "Naranja",
        imagen: "./img/frutas/naranjas.jpg",
        categoria: {
            nombre: "naranja",
            id: "frutas"
        },
        precio: 400
    },
    // carnes
    {
        id: "carne",
        titulo: "Carne",
        imagen: "./img/carnes/carne.jpg",
        categoria: {
            nombre: "Carnes",
            id: "carne"
        },
        precio: 1500
    },
    {
        id: "pescado",
        titulo: "Pescado",
        imagen: "./img/carnes/pescado.jpg",
        categoria: {
            nombre: "pescado",
            id: "carne"
        },
        precio: 2500
    },
    {
        id: "pollo",
        titulo: "Pollo",
        imagen: "./img/carnes/pollo.jpg",
        categoria: {
            nombre: "pollo",
            id: "carne"
        },
        precio: 1200
    },
    {
        id: "salchicha",
        titulo: "Salchicha",
        imagen: "./img/carnes/salchicha.jpg",
        categoria: {
            nombre: "salchicha",
            id: "carne"
        },
        precio: 900
    },
    // caramelos
    {
        id: "caramelo",
        titulo: "Caramelo Masticable",
        imagen: "./img/caramelos/candy.jpg",
        categoria: {
            nombre: "Golosinas",
            id: "golosinas"
        },
        precio: 500
    },
    {
        id: "oreo",
        titulo: "Oreos Americana",
        imagen: "./img/caramelos/oreo.jpg",
        categoria: {
            nombre: "oreo",
            id: "golosinas"
        },
        precio: 1500
    },
    {
        id: "chocolate",
        titulo: "Chocolate con leche",
        imagen: "./img/caramelos/chocolate.jpg",
        categoria: {
            nombre: "chocolate",
            id: "golosinas"
        },
        precio: 1500
    },
];

// Con estas variables manipulo el DOM

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloprincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelector(".agregar");
const numerito = document.querySelector("#numerito");

const cargarProductos = (productosElegidos) => {
    
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="prdocuto-precio">$${producto.precio} Kg</p>
            <button class="agregar" id="${producto.id}">agregar</button>
        </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
    console.log(botonesAgregar)
}
cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) =>{
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find( producto => producto.categoria.id === e.currentTarget.id);

            tituloprincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else{
            tituloprincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let produtosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else{
    productosEnCarrito = [];
}

function agregarAlCarrito (e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find (producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Esta funcion me ayuda a actualizar el numero del contador de productos

function actualizarNumerito () {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumero;
}