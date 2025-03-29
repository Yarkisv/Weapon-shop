import connection from "../db_config.js";
import path from "path";
import fs from "fs";

export function getCatalog(req, res) {
  console.log("Received request for catalog");

  const query = `SELECT category_id,
                          manufacturer_id,
                          name_,
                          caliber,
                          weight,
                          price,
                          stock,
                          length,
                          color,
                          stock_type,
                          path_to
                   FROM Weapons;`;

  connection.query(query, async (err, result) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    console.log(`Fetched ${result.length} records from database`);

    const weaponsData = await Promise.all(
      result.map(async (weapon) => {
        const filePath = path.join(process.cwd(), "public", weapon.path_to);
        let imageBlob = "not found";

        if (fs.existsSync(filePath)) {
          console.log(`Reading file: ${filePath}`);
          try {
            const fileBuffer = fs.readFileSync(filePath);
            imageBlob = fileBuffer.toString("base64"); // Кодируем в base64 для передачи в JSON
          } catch (readErr) {
            console.error(`Error reading file: ${filePath}`, readErr);
          }
        } else {
          console.warn(`File not found: ${filePath}`);
        }

        return {
          category_id: weapon.category_id,
          manufacturer_id: weapon.manufacturer_id,
          name: weapon.name_,
          caliber: weapon.caliber,
          weight: weapon.weight,
          price: weapon.price,
          stock: weapon.stock,
          length: weapon.length,
          color: weapon.color,
          stock_type: weapon.stock_type,
          image: imageBlob,
        };
      })
    );

    console.log("Sending response to client");
    res.status(200).json({ weaponsData: weaponsData });
  });
}

export function getProductByName(req, res) {
  const name = req.params.name;

  const query = "select * from weapons where name_ = ?";

  try {
    connection.query(query, [name], async (err, result) => {
      if (err) {
        console.log("Server error while fetching");
        return res.status(500).json({ message: "Server error" + err });
      }

      if (result.length === 0) {
        console.log("Product not found");
        return res.status(404).json({ message: "Product not found" });
      }

      console.log("Product found");

      const weapon = await Promise.all(
        result.map(async (weapon) => {
          const filePath = path.join(process.cwd(), "public", weapon.path_to);
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
            category_id: weapon.category_id,
            manufacturer_id: weapon.manufacturer_id,
            name: weapon.name_,
            caliber: weapon.caliber,
            weight: weapon.weight,
            price: weapon.price,
            stock: weapon.stock,
            length: weapon.length,
            color: weapon.color,
            stock_type: weapon.stock_type,
            image: imageBlob,
          };
        })
      );

      return res
        .status(200)
        .json({ message: "Product found", product: weapon[0] });
    });
  } catch (error) {}
}