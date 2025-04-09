import connection from "../db_config.js";
import path from "path";
import fs from "fs";

export function getCatalog(req, res) {
  console.log("Received request for full catalog");

  const queries = {
    weapons: `
      SELECT w.*, p.name_, p.price, p.path_to, p.manufacturer_id, p.category_id 
      FROM Weapons w 
      JOIN Products p ON w.product_id = p.product_id`,
    tanks: `
      SELECT t.*, p.name_, p.price, p.path_to, p.manufacturer_id, p.category_id 
      FROM Tanks t 
      JOIN Products p ON t.product_id = p.product_id`,
    aircrafts: `
      SELECT a.*, p.name_, p.price, p.path_to, p.manufacturer_id, p.category_id 
      FROM Aircrafts a 
      JOIN Products p ON a.product_id = p.product_id`
  };

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

  const processItems = (rows, fields) => {
    return rows.map(row => {
      const image = readImage(row.path_to);
      const result = {
        product_id: row.product_id,
        name: row.name_,
        price: row.price,
        manufacturer_id: row.manufacturer_id,
        category_id: row.category_id,
        image
      };

      fields.forEach(field => result[field] = row[field]);
      return result;
    });
  };

  connection.query(queries.weapons, (err, weaponsRows) => {
    if (err) return res.status(500).json({ message: "Error fetching weapons", error: err });

    connection.query(queries.tanks, (err, tanksRows) => {
      if (err) return res.status(500).json({ message: "Error fetching tanks", error: err });

      connection.query(queries.aircrafts, (err, aircraftsRows) => {
        if (err) return res.status(500).json({ message: "Error fetching aircrafts", error: err });

        const weapons = processItems(weaponsRows, ["caliber", "weight", "length", "color", "stock", "stock_type"]);
        const tanks = processItems(tanksRows, ["armor_thickness", "crew_size", "engine_power", "weight"]);
        const aircrafts = processItems(aircraftsRows, ["max_speed", "wingspan", "engine_count", "flight_range", "crew_size"]);

        return res.status(200).json({
          weapons,
          tanks,
          aircrafts
        });
      });
    });
  });
}
