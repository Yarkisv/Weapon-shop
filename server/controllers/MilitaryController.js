import connection from "../db_config.js";
import { TankModel, AircraftModel } from "../models/MilitaryModels.js";

export function createTank(req, res) {
  const {
    product_id,
    armor_front,
    armor_side,
    armor_rear,
    crew_size,
    engine_power,
    weight,
    max_speed,
    gun_caliber,
    ammo_capacity,
    fuel_capacity,
    range_km,
  } = req.body;

  const tank = new TankModel(
    product_id,
    armor_front,
    armor_side,
    armor_rear,
    crew_size,
    engine_power,
    weight,
    max_speed,
    gun_caliber,
    ammo_capacity,
    fuel_capacity,
    range_km
  );

  const query = `
        INSERT INTO Tanks 
        (product_id, armor_thickness_front, armor_thickness_side, armor_thickness_rear, crew_size, engine_power, weight, max_speed, gun_caliber, ammo_capacity, fuel_capacity, range_km)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      tank.product_id,
      tank.armor_front,
      tank.armor_side,
      tank.armor_rear,
      tank.crew_size,
      tank.engine_power,
      tank.weight,
      tank.max_speed,
      tank.gun_caliber,
      tank.ammo_capacity,
      tank.fuel_capacity,
      tank.range_km,
    ],
    (err) => {
      if (err) {
        console.error("Error inserting tank:", err);
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(201).json({ message: "Tank inserted successfully" });
    }
  );
}

export function createAircraft(req, res) {
  const {
    product_id,
    max_speed,
    cruise_speed,
    wingspan,
    length,
    height,
    engine_count,
    engine_type,
    flight_range,
    service_ceiling,
    crew_size,
    armament,
    radar,
  } = req.body;

  const aircraft = new AircraftModel(
    product_id,
    max_speed,
    cruise_speed,
    wingspan,
    length,
    height,
    engine_count,
    engine_type,
    flight_range,
    service_ceiling,
    crew_size,
    armament,
    radar
  );

  const query = `
        INSERT INTO Aircrafts
        (product_id, max_speed, cruise_speed, wingspan, length, height, engine_count, engine_type, flight_range, service_ceiling, crew_size, armament, radar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      aircraft.product_id,
      aircraft.max_speed,
      aircraft.cruise_speed,
      aircraft.wingspan,
      aircraft.length,
      aircraft.height,
      aircraft.engine_count,
      aircraft.engine_type,
      aircraft.flight_range,
      aircraft.service_ceiling,
      aircraft.crew_size,
      aircraft.armament,
      aircraft.radar,
    ],
    (err) => {
      if (err) {
        console.error("Error inserting aircraft:", err);
        return res.status(500).json({ message: "Server error" });
      }
      return res
        .status(201)
        .json({ message: "Aircraft inserted successfully" });
    }
  );
}
