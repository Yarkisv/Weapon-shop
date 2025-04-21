export class OrderModel {
  constructor(
    user_id,
    orderDate,
    totalPrice,
    deliveryLocation,
    city,
    paymentMethod
  ) {
    this.user_id = user_id;
    this.orderDate = orderDate;
    this.totalPrice = totalPrice;
    this.deliveryLocation = deliveryLocation;
    this.city = city;
    this.paymentMethod = paymentMethod;
  }
}
export class OrderItems {
  constructor(orderID, weaponID, quantity, price) {
    this.orderID = orderID;
    this.weaponID = weaponID;
    this.quantity = quantity;
    this.price = price;
  }
}
