export function validateTank(req, res, next) {
    const {
        product_id, armor_front, armor_side, armor_rear, crew_size,
        engine_power, weight, max_speed, gun_caliber,
        ammo_capacity, fuel_capacity, range_km
    } = req.body;

    if (!product_id || !armor_front || !armor_side || !crew_size) {
        return res.status(400).json({ message: "Missing tank fields" });
    }
    next();
}

export function validateAircraft(req, res, next) {
    const {
        product_id, max_speed, cruise_speed, wingspan, length,
        engine_count, engine_type, flight_range, service_ceiling,
        crew_size, armament, radar
    } = req.body;

    if (!product_id || !max_speed || !engine_count || !engine_type) {
        return res.status(400).json({ message: "Missing aircraft fields" });
    }
    next();
}
