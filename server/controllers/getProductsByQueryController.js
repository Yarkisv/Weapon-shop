import { connection } from "../db_config.js";
import path from "path";
import fs from "fs";

export async function getProductsByQuery(req, res) {
  const query = req.params.query;

  const dbQuery = `select 
                    p.name_,
                    p.type 
                from products p
                where p.name_ like ?;`;

  let secondQuery = ``;

  try {
    connection.query(dbQuery, `${query}%`, (err, result) => {
      if (err) {
        console.log("SQL server error");
        return res.status(500).json({ message: "SQL server error" });
      }

      if (result.length === 0) {
        console.log("Products not found");
        return res.status(404).json({ message: "Products not found" });
      }

      const productType = result[0].type;

      if (productType === "Танк") {
        secondQuery = `select 
                            p.product_id,
                            p.type,
                            p.article,
                            p.name_ AS product_name,
                            p.price,
                            p.manufacturer_id,
                            p.category_id,
                            p.number_of_reviews,
                            p.rating,
                            p.description_,
                            p.path_to,
                            m.manufacturer_name,
                            m.country,
                            t.armor_thickness,
                            t.crew_size,
                            t.weight,
                            t.engine_power,
                            t.max_speed,
                            t.gun_caliber,
                            t.hull_length,
                            t.turret_rotation_speed,
                            t.operational_range,
                            t.armor_type,
                            t.fuel_capacity,
                            t.transmission_type
                          from Products p 
                          join Tanks t on p.product_id = t.product_id
                          join Manufacturers m on p.manufacturer_id = m.manufacturer_id
                          where p.name_ like ?;`;
      } else if (productType === "Літак") {
        secondQuery = `select 
                            p.product_id,
                            p.type,
                            p.article,
                            p.name_ AS product_name,
                            p.price,
                            p.manufacturer_id,
                            p.category_id,
                            p.number_of_reviews,
                            p.rating,
                            p.description_,
                            p.path_to,
                            m.manufacturer_name,
                            m.country,
                            a.max_speed,
                            a.wingspan,
                            a.engine_count,
                            a.flight_range,
                            a.crew_size,
                            a.max_altitude,
                            a.empty_weight,
                            a.max_takeoff_weight,
                            a.engine_type,
                            a.fuel_capacity,
                            a.climb_rate,
                            a.radar_range
                          from Products p 
                          join Aircrafts a on p.product_id = a.product_id
                          join Manufacturers m on p.manufacturer_id = m.manufacturer_id
                          where p.name_ like ?;`;
      } else if (productType === "Зброя") {
        secondQuery = `select  
                            p.product_id,
                            p.type,
                            p.article,
                            p.name_ AS product_name,
                            p.price,
                            p.manufacturer_id,
                            p.category_id,
                            p.number_of_reviews,
                            p.rating,
                            p.description_,
                            p.path_to,
                            m.manufacturer_name,
                            m.country,
                            w.caliber,
                            w.weight,
                            w.length,
                            w.color,
                            w.stock,
                            w.stock_type
                            from Products p 
                            join Weapons w on p.product_id = w.product_id
                            join Manufacturers m on p.manufacturer_id = m.manufacturer_id
                        where p.name_ like ?;`;
      }

      connection.query(secondQuery, `${query}%`, async (err, result) => {
        if (err) {
          console.log("SQL server error");
          return res.status(500).json({ message: "SQL server error" });
        }

        if (result.length === 0) {
          console.log("Products not found");
          return res.status(404).json({ message: "Products not found" });
        }

        const product = await Promise.all(
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

            if (product.type === "Зброя") {
              return {
                product_type: product.type,
                product_id: product.product_id,
                article: product.article,
                reviews_count: product.number_of_reviews,
                rating: product.rating,
                desc: product.description_,
                manufacturer_name: product.manufacturer_name,
                country: product.country,
                caliber: product.caliber,
                weight: product.weight,
                length: product.length,
                color: product.color,
                stock: product.stock,
                stock_type: product.stock_type,
                name: product.product_name,
                price: product.price,
                image: imageBase64,
              };
            } else if (product.type === "Танк") {
              return {
                product_type: product.type,
                product_id: product.product_id,
                article: product.article,
                reviews_count: product.number_of_reviews,
                rating: product.rating,
                desc: product.description_,
                manufacturer_name: product.manufacturer_name,
                country: product.country,
                name: product.product_name,
                price: product.price,
                armor_thickness: product.armor_thickness,
                crew_size: product.crew_size,
                engine_power: product.engine_power,
                weight: product.weight,
                max_speed: product.max_speed,
                gun_caliber: product.gun_caliber,
                hull_length: product.hull_length,
                turret_rotation_speed: product.turret_rotation_speed,
                operational_range: product.operational_range,
                armor_type: product.armor_type,
                fuel_capacity: product.fuel_capacity,
                transmission_type: product.transmission_type,
                image: imageBase64,
              };
            } else if (product.type === "Літак") {
              return {
                product_type: product.type,
                product_id: product.product_id,
                article: product.article,
                reviews_count: product.number_of_reviews,
                rating: product.rating,
                desc: product.description_,
                manufacturer_name: product.manufacturer_name,
                country: product.country,
                name: product.product_name,
                price: product.price,
                max_speed: product.max_speed,
                wingspan: product.wingspan,
                engine_count: product.engine_count,
                flight_range: product.flight_range,
                crew_size: product.crew_size,
                max_altitude: product.max_altitude,
                empty_weight: product.empty_weight,
                max_takeoff_weight: product.max_takeoff_weight,
                engine_type: product.engine_type,
                fuel_capacity: product.fuel_capacity,
                climb_rate: product.climb_rate,
                radar_range: product.radar_range,
                image: imageBase64,
              };
            }
          })
        );

        return res.status(200).json({ products: product });
      });
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
