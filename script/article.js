const myCart = new cart();

document.addEventListener("DOMContentLoaded",()=>{

    let article;
    let article_id = new URL(window.location.href).searchParams.get("article");


    $.getJSON("../script/products.json",(respuesta,estado)=>{

        if(estado =="success"){


            for(let item of respuesta.products_1){

                if(item.id == article_id){

                    article = item;
                    break;
                }
            }
            if(!article){

                for(let item of respuesta.products_2){

                    if(item.id == article_id){

                        article = item;
                        break;
                    }
                }
            }
            if(article){

                $("#title").html(article.name);
                $("#price").html(`$ ${article.price}`);
                $("#image").attr("src",`../${article.image}`);

                $("#article-button").click(()=>{

                  if(localStorage.getItem("carrito")!==null){

                    myCart.load();
                  }

                  myCart.addItem(article.id,article.name,article.price,`../${article.image}`,$("#article-amount").val());

                  window.location.href = "../index.html";
                });
            }
        }
    });


});
