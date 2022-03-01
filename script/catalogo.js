//==========Variables==========
const myCart = new cart();
let products = [];

function toggleCart(show){

  if(show){

    document.getElementsByClassName("mini-cart")[0].style.transform = "translateX(-37rem)";
    document.getElementById("cart-button").style.transform = "translateX(37rem)";
  }else {
    document.getElementsByClassName("mini-cart")[0].style.transform = "translateX(0rem)";
    document.getElementById("cart-button").style.transform = "translateX(0px)";
  }
}
function renderMiniCart(){

  let html = "";

  for(let product of myCart.productList){

    html += `<div class="mini-cart__productos__item"><p >${product.name}</p>
            <p  class="mini-cart__productos__item__num">$ ${product.price}</p>
            <p  class="mini-cart__productos__item__num">${product.amount}</p></div>`;
  }

  $(".mini-cart__productos").html(html);
}
function addToCart(id,name,price,image,amount=1){

    myCart.addItem(id,name,price,image,amount);

    renderMiniCart();

    //document.getElementsByClassName("mini-cart")[0].style.transform = "translateX(-37rem)"
    toggleCart(true);
}

function renderProducts(page){

   $.getJSON("script/products.json",(respuesta,estado)=>{

      if(estado === "success"){

         switch (page){

            case 2:

               products = respuesta.products_2;
               break;

            default:

               products = respuesta.products_1;
               break;
         }

      }
      $(".lista-productos").empty();
      for(let product of products){

         $(".lista-productos").append(`<article class="producto producto--catalogo">
                  <div class="producto__imagen"></div>
                  <span>${product.name}</span>
                  <p>$${product.price}</p>
                  <button class="button button--producto">Añadir al carrito</button>
            </article>

         `)
         $(".lista-productos").children().last().find("button").click((e)=>{

            e.stopPropagation();
            addToCart(product.id,product.name,product.price,`../${product.image}`);
         })
         $(".lista-productos").children().last().find(".producto__imagen").css("background-image",`url(${product.image})`)
         $(".lista-productos").children().last().click(()=>{

            window.location.href = `pages/articulo.html?article=${product.id}`
         })
      }
   });


}

$(()=>{


   renderProducts(1)


   if(localStorage.getItem("carrito")!==null){

      myCart.load();
   }

   renderMiniCart();

   $("#prev").click(()=>{

      renderProducts(1)
   });
   $("#next").click(()=>{

      renderProducts(2)
   })

  $("#mini-cart__close").click(()=>{

    //document.getElementsByClassName("mini-cart")[0].style.transform = "translateX(37rem)";
    toggleCart(false);
  });

  $("#cart-button").click(()=>{

    toggleCart(true);
  })
});
