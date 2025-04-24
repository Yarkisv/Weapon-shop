import connection from "../db_config.js";
import fs from "fs";
import path from "path";

export function getOrders(req, res) {
  const id = req.user_id;
  console.log("Get orders func");

  const query = `select
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

      const orders = await Promise.all(
        result.map(async (product) => {
          const filePath = path.join(process.cwd(), "", product.path_to);
          let imageBase64 = null;

          if (fs.existsSync(filePath)) {
            console.log(`Reading file: ${filePath}`);
            try {
              const fileBuffer = fs.readFileSync(filePath);
              imageBase64 = fileBuffer.toString("base64");
            } catch (readErr) {
              console.error(`Error reading file: ${filePath}`, readErr);
            }
          } else {
            console.warn(`File not found: ${filePath}`);
          }

          return {
            order_date: product.order_date,
            payment_method: product.payment_method,
            total_price: product.total_price,
            product_quantity: product.quantity,
            product_price: product.price,
            product_name: product.name_,
            product_image: imageBase64,
            order_item_id: product.order_item_id,
          };
        })
      );
      return res.status(200).json({ orders: orders });
    });
  } catch (error) {}
}
