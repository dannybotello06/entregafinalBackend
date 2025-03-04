const socket=io();

const formNewProduct= document.getElementById("formNewProduct");
formNewProduct.addEventListener("submit",(event)=>{

    event.preventDefault();
    const formData = new FormData(formNewProduct);

    const productData={};

    formData.forEach((value,key)=>{

        productData[key]=value;
    })

    socket.emit("newProduct",productData)

})

socket.on("productAdded",(newProduct,id)=>{

    const productList= document.getElementById("productsList");

    productList.innerHTML+=
    `<li id=${id}>${newProduct.title}-${newProduct.price}
    <button id=${id} >Borrar</button>
     </il> `
    location.reload();  
});


const wrapper= document.getElementById("productsList");

wrapper.addEventListener('click', (event) => {
    console.log("event.target.id");
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
    console.log("event.target.id");
    console.log(event.target.id);
    socket.emit("deleteProduct",event.target.id)

  })



socket.on("productUpdate",(id)=>{

    console.log("productUpdate");
    node=document.getElementById(id);
    node.parentNode.removeChild(node);


});



