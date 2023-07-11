//DOM element
//let chatbot =document.getElementById('chatbot')
let listaProducto =document.getElementById('listaProducto')
let addProducto =document.querySelector('#form1')
//let formData =new FormData(addProducto);
let delProducto =document.getElementById('form2')


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
