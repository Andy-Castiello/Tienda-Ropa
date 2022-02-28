//==========Variables==========
const myCart = new cart();

//==========Funciones==========
function renderCarrito(){

    let cart = document.getElementsByClassName("carrito")[0];

    if(cart){

        document.getElementById("total").innerHTML = `Total: $${myCart.total()}`;
        cart.innerHTML = "";
        let html_item;
        for(let item of myCart.productList){

            html_item = document.createElement("article");
            html_item.classList.add("producto");
            html_item.innerHTML = `<div class="producto__imagen"></div>
                <p class="name">${item.name}</p>
                <p>Cantidad: ${item.amount}</p>
                <p>$${item.price}</p>
                <p>SubTotal: $${item.subtotal()}</p>
                <div class="producto__buttons">
                <button class="increase button button--producto">+</button>
                <button class="decrease button button--producto">-</button>
                <button class="remove button button--producto">Eliminar Producto</button>
                </div>`;
            html_item.querySelector(".producto__imagen").style["background-image"] = `url(${item.image})`
            html_item.querySelector(".increase").addEventListener("click",(e)=>{
                e.stopPropagation();
                incrementProduct(item.id)
            })
            html_item.querySelector(".decrease").addEventListener("click",(e)=>{
                e.stopPropagation();
                decrementProduct(item.id)
            })
            html_item.querySelector(".remove").addEventListener("click",(e)=>{

                e.stopPropagation();
                $(e.target).parent().parent().fadeOut("slow",()=>{removeProduct(item.id)});
            })
            html_item.addEventListener("click",()=>{

                window.location.href = `articulo.html?article=${item.id}`
             })
            cart.appendChild(html_item);
        }
    }


}
function incrementProduct(id){

    myCart.increaseItem(id);
    renderCarrito();
}
function decrementProduct(id){

    myCart.decreaseItem(id);
    renderCarrito();
}

function removeProduct(id){

    myCart.removeItem(id);
    renderCarrito();

}

document.addEventListener("DOMContentLoaded", ()=>{

    if(localStorage.getItem("carrito")!==null){

        myCart.load();
    }
    renderCarrito();
});
