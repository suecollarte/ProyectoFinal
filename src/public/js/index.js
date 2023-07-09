const socket = io()


//DOM element
//let chatbot =document.getElementById('chatbot')
let listaProducto =document.getElementById('listaProducto')
let addProducto =document.querySelector('#form1')
let formData =new FormData(addProducto);
let delProducto =document.getElementById('form2')


addProducto.addEventListener('submit', event => {
    const codigo = document.querySelector('#codigo')
    const description = document.querySelector('#description')
    const title = document.querySelector('#title')
    const stock = document.querySelector('#stock')
    const category = document.querySelector('#category')
    alert(title.value)
    const producto={
        code: code.value,
        description:description.value,
        stock:stock.value,
        category:category.value,
        title:title.value
    }
      event.preventDefault();
      //comportamiento por defecto no recargar caja
      fetch('/api/products',{
        method:'POST',
        body:producto
        })
        .then(res => res.json())
        .then(data => console.log(data))
      
  
}) 

/* listaProducto.getElementById('btn').addEventListener('click', evt => {
      //console log de un front
    //socket.emit('message', evt.key)
    
    
}) */

socket.on("listaProducto", function (data) {

   let htmlCuerpo ='<div class="container"><div class="row align-items-start"><dt class="col">Id</dt><dt class="col">Codigo</dt><dt class="col">Descripcion</dt></div>'
   for (const key in data) {
    htmlCuerpo += `<div class="row"><div class="col">${data[key].description}</div>
    <div class="col"> producto ${data[key].code}</div>
    <div class="col"> producto ${data[key].stock}</div></div>`;
       
   };
   htmlCuerpo += '</div>'
   document.querySelector('#Productos').innerHTML=htmlCuerpo;

})

delProducto.addEventListener('submit', evt => {

    const codigo = document.querySelector('#codigodel')
    const codigovalue= codigo.value
     //producto a borrar 
      socket.emit("client-borraProducto", codigovalue) 
     //emite hacia el servidor
    
})

socket.on('history', data => {
    
    let history=document.getElementById('history');
    let messages =''
    data.forEach(message => {
        messages += `${message.id} dice ${message.message}<br>`
        
    });
    history.innerHTML = messages
})