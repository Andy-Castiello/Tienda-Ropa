function product(id,name,price,amount,image){

    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
    this.image = image;

    this.subtotal=()=>{

        return this.price * this.amount;
    }
}