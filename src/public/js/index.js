const table = document.getElementById('productsTable')
const socket =socketServer();

socket.on('updatedProducts', data => {
    table.innerHTML = 
        `<tr>
            <td><strong>Producto</strong></td>
            <td><strong>Descripción</strong></td>
            <td><strong>Precio</strong></td>
            <td><strong>Código</strong></td>
            <td><strong>Stock</strong></td>
            <td><strong>Categoría</strong></td>
        </tr>`;
        for (product of data) {
            let tr = document.createElement('tr')
            tr.innerHTML=
                        `   <td>${product.title}</td>
                            <td>${product.description}</td>
                            <td>${product.price}</td>
                            <td>${product.code}</td>
                            <td>${product.stock}</td>
                            <td>${product.category}</td>
                        `;
            table.getElementsByTagName('tbody')[0].appendChild(tr);
        }
           
} )

//DOM element
//let chatbot =document.getElementById('chatbot')
let addProducto =document.querySelector('#form1')
//let formData =new FormData(addProducto);

addProducto.addEventListener('submit', event => {
    
    const code = document.querySelector('#code')
    const description = document.querySelector('#description')

    const title = document.querySelector('#title')
    const stock = document.querySelector('#stock')
    const status = document.querySelector('#status')
    const category = document.querySelector('#category')
    const price = document.querySelector('#price')
   
     const producto={
        description:description.value,
        code: code.value,
        stock:stock.value,
        title:title.value,
        status:status.value,
        category:category.value,
        thumbails:'[]',
        price: price.value      
    } 
    
})  

function deleteproducto (id){
    const idObjecto=id;
    fetch(`/api/products/borre/${idObjecto}`)
   .then(result => alert('borrado'))                                                                                                                                                                                                                                                                               
   .then( () => fetch('/api/products/'))
   }
/* const res = await fetch(`/api/carts/${cart}/product/${id}`, {
    method: "POST",
  }); */

 
    function seleccionaproducto (id){
    const idObjeto=id;
    //alert(id)
    fetch(`/api/products/${idObjeto}`)
   .then(result =>{ console.log('listo')})
   .then( () => {fetch('/api/products/')})
 
   }
   