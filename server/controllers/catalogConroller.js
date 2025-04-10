import connection from "../db_config.js";
import path from "path";
import fs from "fs";

export function getCatalog(req, res) {
  console.log("Received request for catalog");

  const productCategory = req.params.category;

  let query = "";

  if (productCategory === "guns") {
    query = `select 
	            p.product_id,
              p.type,
              p.article,
	            p.name_ AS product_name,
	            p.price,
	            p.manufacturer_id,
	            p.category_id,
              p.number_of_reviews,
              p.rating,
              w.caliber,
              w.weight,
              w.length,
              w.color,
              w.stock,
              w.stock_type,
              w.path_to
            from Products p join weapons w on p.product_id = w.product_id where p.type = "зброя";`;
  } else if (productCategory === "tanks") {
    query = `select 
              p.product_id,
              p.type,
              p.article,
              p.name_ AS product_name,
              p.price,
              p.manufacturer_id,
              p.category_id,
              p.number_of_reviews,
              p.rating,
              t.armor_thickness,
              t.crew_size,
              t.engine_power,
              t.weight,
              t.path_to
            from Products p join Tanks t on p.product_id = t.product_id where p.type = 'Танк';`;
  } else if (productCategory === "military-aircrafts") {
    query = `select 
	            p.product_id,
              p.type,
              p.article,
	            p.name_ AS product_name,
		          p.price,
	            p.manufacturer_id,
	            p.category_id,
              p.number_of_reviews,
              p.rating,
              a.max_speed,
              a.wingspan,
              a.engine_count,
              a.flight_range,
              a.crew_size,
              a.path_to
            from Products p join Aircrafts a on p.product_id = a.product_id where p.type = "літак";`;
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

    console.log(result);

    const weapons = await Promise.all(
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

        if (product.type === "Зброя") {
          return {
            product_type: product.type,
            product_id: product.product_id,
            article: product.article,
            reviews_count: product.number_of_reviews,
            rating: product.rating,
            caliber: product.caliber,
            weight: product.weight,
            length: product.length,
            color: product.color,
            stock: product.stock,
            stock_type: product.stock_type,
            name: product.product_name,
            price: product.price,
            image: imageBlob,
          };
        } else if (product.type === "Танк") {
          return {
            product_type: product.type,
            product_id: product.product_id,
            article: product.article,
            reviews_count: product.number_of_reviews,
            rating: product.rating,
            name: product.product_name,
            price: product.price,
            armor_thickness: product.armor_thickness,
            crew_size: product.crew_size,
            engine_power: product.engine_power,
            weight: product.weight,
            image: imageBlob,
          };
        } else if (product.type === "Літак") {
          return {
            product_type: product.type,
            product_id: product.product_id,
            article: product.article,
            reviews_count: product.number_of_reviews,
            rating: product.rating,
            name: product.product_name,
            price: product.price,
            max_speed: product.max_speed,
            wingspan: product.wingspan,
            engine_count: product.engine_count,
            flight_range: product.flight_range,
            crew_size: product.crew_size,
            image: imageBlob,
          };
        }
      })
    );

    return res.status(200).json({ weapons });
  });
}
