// models/MilitaryModels.js

export class TankModel {
    constructor(product_id, armor_front, armor_side, armor_rear, crew_size, engine_power, weight, max_speed, gun_caliber, ammo_capacity, fuel_capacity, range_km) {
        this.product_id = product_id;
        this.armor_front = armor_front;
        this.armor_side = armor_side;
        this.armor_rear = armor_rear;
        this.crew_size = crew_size;
        this.engine_power = engine_power;
        this.weight = weight;
        this.max_speed = max_speed;
        this.gun_caliber = gun_caliber;
        this.ammo_capacity = ammo_capacity;
        this.fuel_capacity = fuel_capacity;
        this.range_km = range_km;
    }
}

export class AircraftModel {
    constructor(product_id, max_speed, cruise_speed, wingspan, length, height, engine_count, engine_type, flight_range, service_ceiling, crew_size, armament, radar) {
        this.product_id = product_id;
        this.max_speed = max_speed;
        this.cruise_speed = cruise_speed;
        this.wingspan = wingspan;
        this.length = length;
        this.height = height;
        this.engine_count = engine_count;
        this.engine_type = engine_type;
        this.flight_range = flight_range;
        this.service_ceiling = service_ceiling;
        this.crew_size = crew_size;
        this.armament = armament;
        this.radar = radar;
    }
}
