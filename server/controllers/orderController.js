import { connection } from "../db_config.js";

export async function createOrder(req, res) {
  const {
    phone,
    orderDate,
    totalPrice,
    deliveryLocation,
    city,
    paymentMethod,
    orderItems,
  } = req.body;

  console.log(orderItems);

  try {
    const [userResult] = await connection.query(
      "SELECT user_id FROM users WHERE phone = ?",
      [phone]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_id = userResult[0].user_id;

    const [orderResult] = await connection.query(
      "INSERT INTO Orders (user_id, order_date, delivery_location, city, payment_method, total_price) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, orderDate, deliveryLocation, city, paymentMethod, totalPrice]
    );

    const order_id = orderResult.insertId;

    const minimalOrderItems = orderItems.map((item) => [
      order_id,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    await connection.query(
      "INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES ?",
      [minimalOrderItems]
    );

    return res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
