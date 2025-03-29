export class OrderModel{
    constructor(userID, orderDate, totalPrice){
        this.userID = userID;
        this.orderDate = orderDate;
        this.totalPrice = totalPrice;
    }
}
export class OrderItems{
    constructor(orderID, weaponID, quantity, price){
        this.orderID = orderID;
        this.weaponID = weaponID;
        this.quantity = quantity;
        this.price = price;
    }
}