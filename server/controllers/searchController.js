import connection from "../db_config.js";

export function searchProducts(req, res) {
  const query = req.params.query;

  const dbQuery = `select
	                  p.product_id, 
                    p.name_
                    from products p 
                  where name_ like ?;`;

  connection.query(dbQuery, `${query}%`, (err, result) => {
    if (err) {
      console.log("SQL server error");
      return res.status(500).json({ message: "SQL server error" });
    }

    if (result.length === 0) {
      console.log("Products not found");
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Products fetched");
    return res.status(200).json({ results: result });
  });
}
