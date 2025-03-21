export class weaponModel{
    constructor(
    weapon_id,
    category_id,
    manufacturer_id,
    name,
    caliber,
    weight,
    price,
    stock,
    length_,
    color,
    path_to,
    stock_type
    ){
    this.weapon_id = weapon_id;
    this.category_id = category_id;
    this.manufacturer_id = manufacturer_id;
    this.name = name;
    this.caliber = caliber;
    this.weight = weight;
    this.price = price;
    this.stock = stock;
    this.length_ = length_;
    this.color = color;
    this.path_to = path_to;
    this.stock_type = stock_type;
  }
}