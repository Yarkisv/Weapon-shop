import connection from "../db_config.js";
import { OrderModel } from "../models/OrderModels.js";

export function createOrder(req, res) {
    const { phone, orderDate, totalPrice, orderItems } = req.body;

    try {
        connection.query(`SELECT user_id FROM users WHERE phone = ?`, [phone], (err, result) => {
            if (err) {
                console.error("Error checking user:", err);
                return res.status(500).json({ message: "Server error" });
            }
            if (result.length === 0) return res.status(400).json({ message: "User not found" });

            const userID = result[0].user_id;
            const orderModel = new OrderModel(userID, orderDate, totalPrice);
            const OrderQuery = `INSERT INTO Orders (user_id, order_date, total_price) VALUES (?, ?, ?)`;

            connection.query(OrderQuery, [orderModel.userID, orderModel.orderDate, orderModel.totalPrice], (err, result) => {
                if (err) {
                    console.error("Error creating order:", err);
                    return res.status(500).json({ message: "Server error" });
                }
                const orderID = result.insertId;
                console.log("Order created with ID:", orderID);

                if (!orderItems || orderItems.length === 0) return res.status(201).json({ message: "Order created successfully", orderID });
                

                const weaponIDs = orderItems.map(item => item.weaponID);
                const checkWeaponsQuery = `SELECT weapon_id FROM Weapons WHERE weapon_id IN (?)`;

                connection.query(checkWeaponsQuery, [weaponIDs], (err, results) => {
                    if (err) {
                        console.error("Error checking weapons:", err);
                        return res.status(500).json({ message: "Server error" });
                    }

                    const existingWeaponIDs = results.map(row => row.weapon_id);
                    const invalidWeapons = weaponIDs.filter(id => !existingWeaponIDs.includes(id));

                    if (invalidWeapons.length > 0) return res.status(400).json({ message: `Invalid weapon IDs: ${invalidWeapons.join(", ")}` });

                    const OrderItemsQuery = `INSERT INTO Order_Items (order_id, weapon_id, quantity, price) VALUES ?`;
                    const orderItemsData = orderItems.map(item => [
                        orderID,
                        item.weaponID,
                        item.quantity,
                        item.price
                    ]);

                    connection.query(OrderItemsQuery, [orderItemsData], (err) => {
                        if (err) {
                            console.error("Error creating order items:", err);
                            return res.status(500).json({ message: "Server error" });
                        }
                        console.log("Order items created successfully");
                        return res.status(201).json({ message: "Order created successfully", orderID });
                    });
                });
            });
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}


// import connection from "../db_config.js";
// import { OrderModel } from "../models/OrderModels.js";

// export function createOrder(req, res) {
//     const { userID, orderDate, totalPrice, orderItems } = req.body;

//     try {
//         connection.query(`SELECT user_id FROM users WHERE user_id = ?`, [userID], (err, result) => {
//             if (err) {
//                 console.error("Error checking user:", err);
//                 return res.status(500).json({ message: "Server error" });
//             }
//             if (result.length === 0) return res.status(400).json({ message: "User not found" });

//             const orderModel = new OrderModel(userID, orderDate, totalPrice);
//             const OrderQuery = `INSERT INTO Orders (user_id, order_date, total_price) VALUES (?, ?, ?)`;

//             connection.query(OrderQuery, [orderModel.userID, orderModel.orderDate, orderModel.totalPrice], (err, result) => {
//                 if (err) {
//                     console.error("Error creating order:", err);
//                     return res.status(500).json({ message: "Server error" });
//                 }
//                 const orderID = result.insertId;
//                 console.log("Order created with ID:", orderID);

//                 if (!orderItems || orderItems.length === 0) {
//                     return res.status(201).json({ message: "Order created successfully", orderID });
//                 }

//                 const weaponIDs = orderItems.map(item => item.weaponID);
//                 const checkWeaponsQuery = `SELECT weapon_id FROM Weapons WHERE weapon_id IN (?)`;

//                 connection.query(checkWeaponsQuery, [weaponIDs], (err, results) => {
//                     if (err) {
//                         console.error("Error checking weapons:", err);
//                         return res.status(500).json({ message: "Server error" });
//                     }

//                     const existingWeaponIDs = results.map(row => row.weapon_id);
//                     const invalidWeapons = weaponIDs.filter(id => !existingWeaponIDs.includes(id));

//                     if (invalidWeapons.length > 0) {
//                         return res.status(400).json({ message: `Invalid weapon IDs: ${invalidWeapons.join(", ")}` });
//                     }

//                     const OrderItemsQuery = `INSERT INTO Order_Items (order_id, weapon_id, quantity, price) VALUES ?`;
//                     const orderItemsData = orderItems.map(item => [
//                         orderID,
//                         item.weaponID,
//                         item.quantity,
//                         item.price
//                     ]);

//                     connection.query(OrderItemsQuery, [orderItemsData], (err) => {
//                         if (err) {
//                             console.error("Error creating order items:", err);
//                             return res.status(500).json({ message: "Server error" });
//                         }
//                         console.log("Order items created successfully");
//                         return res.status(201).json({ message: "Order created successfully", orderID });
//                     });
//                 });
//             });
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// }


// import connection from "../db_config.js";
// import { OrderModel } from "../models/OrderModels.js";

// export function createOrder(req, res) {
//     const { userID, orderDate, totalPrice, orderItems } = req.body;

//     try {
//         // Проверяем, существует ли пользователь перед созданием заказа
//         connection.query(`SELECT user_id FROM users WHERE user_id = ?`, [userID], (err, result) => {
//             if (err) {
//                 console.error("Error checking user:", err);
//                 return res.status(500).json({ message: "Server error" });
//             }
//             if (result.length === 0) return res.status(400).json({ message: "User not found" });
//             const orderModel = new OrderModel(userID, orderDate, totalPrice);
//             const OrderQuery = `INSERT INTO Orders (user_id, order_date, total_price) VALUES (?, ?, ?)`;
//             connection.query(OrderQuery, [orderModel.userID, orderModel.orderDate, orderModel.totalPrice], (err, result) => {
//                 if (err) {
//                     console.error("Error creating order:", err);
//                     return res.status(500).json({ message: "Server error" });
//                 }
//                 const orderID = result.insertId;
//                 console.log("Order created with ID:", orderID);
//                 if (!orderItems || orderItems.length === 0) {
//                     return res.status(201).json({ message: "Order created successfully", orderID });
//                 }
//                 const OrderItemsQuery = `INSERT INTO Order_Items (order_id, weapon_id, quantity, price) VALUES ?`;
//                 const orderItemsData = orderItems.map(item => [
//                     orderID,
//                     item.weaponID,
//                     item.quantity,
//                     item.price
//                 ]);
//                 connection.query(OrderItemsQuery, [orderItemsData], (err) => {
//                     if (err) {
//                         console.error("Error creating order items:", err);
//                         return res.status(500).json({ message: "Server error" });
//                     }
//                     console.log("Order items created successfully");
//                     return res.status(201).json({ message: "Order created successfully", orderID });
//                 });
//             });
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// }
