const socket =io();


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
   