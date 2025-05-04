import connection from "../db_config.js";
import path from "path";
import fs from "fs";

export function searchProducts(req, res) {
  const query = req.params.query;

  const dbQuery = `select
	                  p.product_id, 
                    p.name_,
                    p.type,
                    p.price,
                    p.path_to
                    from products p 
                  where name_ like ?;`;

  connection.query(dbQuery, `${query}%`, async (err, result) => {
    if (err) {
      console.log("SQL server error");
      return res.status(500).json({ message: "SQL server error" });
    }

    if (result.length === 0) {
      console.log("Products not found");
      return res.status(404).json({ message: "Product not found" });
    }

    const products = await Promise.all(
      result.map(async (product) => {
        const filePath = path.join(process.cwd(), "", product.path_to);
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

        return {
          product_id: product.product_id,
          product_name: product.name_,
          product_type: product.type,
          product_price: product.price,
          product_image: imageBase64,
        };
      })
    );

    console.log("Products fetched");
    return res.status(200).json({ results: products });
  });
}
