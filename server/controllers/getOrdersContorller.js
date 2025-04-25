import connection from "../db_config.js";
import fs from "fs";
import path from "path";

export function getOrders(req, res) {
  const id = req.user_id;
  console.log("Get orders func");

  const query = `select
                  o.order_id,
	                o.order_date,
                  o.payment_method,
                  o.total_price,
                  oi.product_id,
                  oi.quantity,
                  oi.price,
                  oi.order_item_id,
                  p.name_,
                  p.path_to
                  from orders o
                  join products p
                  join order_items oi
                where o.user_id = ? and p.product_id = oi.product_id;`;

  try {
    connection.query(query, id, async (err, result) => {
      if (err) {
        console.log("SQL error: " + err);
        return res.status(500).json({ message: "SQL error" });
      }

      const ordersMap = {};

      for (const row of result) {
        const filePath = path.join(process.cwd(), row.path_to || "");
        let imageBase64 = null;

        if (fs.existsSync(filePath)) {
          try {
            const fileBuffer = fs.readFileSync(filePath);
            imageBase64 = fileBuffer.toString("base64");
          } catch (readErr) {
            console.error(`Error reading file: ${filePath}`, readErr);
          }
        } else {
          console.warn(`File not found: ${filePath}`);
        }

        if (!ordersMap[row.order_id]) {
          ordersMap[row.order_id] = {
            order_id: row.order_id,
            order_date: row.order_date,
            payment_method: row.payment_method,
            total_price: row.total_price,
            items: [],
          };
        }

        ordersMap[row.order_id].items.push({
          order_item_id: row.order_item_id,
          product_id: row.product_id,
          product_name: row.name_,
          product_quantity: row.quantity,
          product_price: row.price,
          product_image: imageBase64,
        });
      }

      const orders = Object.values(ordersMap);
      return res.status(200).json({ orders });
    });
  } catch (error) {}
}
