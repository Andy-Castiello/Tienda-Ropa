function cart(){

    this.productList = [];

    this.total = ()=>{
        if(this.productList.length===0)return 0;
        return this.productList.reduce((a,b)=>a+b.subtotal(),0);
    }

    this.addItem = (id,name,price,image,amount=1) =>{

        let position = this.isItem(id);
        if(position===false){

            this.productList.push(new product(id,name,price,amount,image));

        }else this.productList[position].amount+= parseInt(amount);
        this.save();

    }

    this.increaseItem = (id)=>{

        for(let item of this.productList){

            if(item.id == id){

                item.amount+=1;
                break;
            }
        }
        this.save();
    }

    this.decreaseItem = (id)=>{

        for(let item of this.productList){

            if(item.id == id){

                if(item.amount>1){

                    item.amount-=1;
                    break;
                }

            }
        }
        this.save();
    }

    this.removeItem = (id)=>{

        for(let i=0;i<this.productList.length;i++){

            if(id === this.productList[i].id){

                this.productList.splice(i,1);
                break;
            }
        }
        this.save();
    }

    this.isItem=(id)=>{

        for(let i=0;i<this.productList.length;i++){

            if(this.productList[i].id === id)return i;
        }
        return false;
    }
    this.save=()=>{

        let memory = {

            productList: this.productList,
        }
        localStorage.setItem("carrito",JSON.stringify(memory));
    }
    this.load = ()=>{

        let memory = JSON.parse(localStorage.getItem("carrito"));

        for(let i of memory.productList){

            this.productList.push(new product(i.id,i.name,i.price,parseInt(i.amount),i.image));
        }
    }

}
