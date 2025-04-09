import connection from "../db_config.js";
import path from "path";
import fs from "fs";

export function getCatalog(req, res) {
  console.log("Received request for catalog");

  const productCategory = req.params.category;

  let query = "";

  if (productCategory === "guns") {
    query = `SELECT w.*, p.name_, p.price, p.path_to, p.manufacturer_id, p.category_id 
      FROM Weapons w 
      JOIN Products p ON w.product_id = p.product_id`;
  } else if (productCategory === "tanks") {
    query = `SELECT t.*, p.name_, p.price, p.path_to, p.manufacturer_id, p.category_id 
      FROM Tanks t 
      JOIN Products p ON t.product_id = p.product_id`;
  } else if (productCategory === "military-aircrafts") {
    query = `SELECT a.*, p.name_, p.price, p.path_to, p.manufacturer_id, p.category_id 
      FROM Aircrafts a 
      JOIN Products p ON a.product_id = p.product_id`;
  } else {
    console.log("Category is undefined");
  }

  const readImage = (relativePath) => {
    const filePath = path.join(process.cwd(), relativePath);
    if (fs.existsSync(filePath)) {
      try {
        return fs.readFileSync(filePath).toString("base64");
      } catch (err) {
        console.error("Error reading file:", filePath, err);
      }
    } else {
      console.warn("File not found:", filePath);
    }
    return "not found";
  };

  connection.query(query, async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error during fetching products" });
    }

    // console.log(result);

    const products = await Promise.all(
      result.map(async (product) => {
        const filePath = path.join(process.cwd(), "", product.path_to);
        let imageBlob = "not found";

        if (fs.existsSync(filePath)) {
          console.log(`Reading file: ${filePath}`);
          try {
            const fileBuffer = fs.readFileSync(filePath);
            imageBlob = fileBuffer.toString("base64");
          } catch (readErr) {
            console.error(`Error reading file: ${filePath}`, readErr);
          }
        } else {
          console.warn(`File not found: ${filePath}`);
        }

        return {
          product_id: result.product_id,
          caliber: result.caliber,
          weight: result.weight,
          length: result.length,
          color: result.color,
          stock: result.stock,
          stock_type: result.stock_type,
          name: result.name_,
          price: result.price,
          image: imageBlob,
        };
      })
    );

    console.log(products)

    return res.status(200).json({ products });
  });
}
