CREATE SCHEMA IF NOT EXISTS 'tin-mp2';

CREATE TABLE IF NOT EXISTS 'tin-mp2'.'Driver'
(
'id' INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
'first_name' VARCHAR(20) NOT NULL,
'last_name' VARCHAR(20) NOT NULL,
'birthdate' DATE NOT NULL,
'weight' DECIMAL NOT NULL,
'phone_number' VARCHAR(15)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS 'tin-mp2'.'Gokart'
(
'id' INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
'brand' VARCHAR(20) NOT NULL,
'model' VARCHAR(50) NOT NULL,
'color' VARCHAR(20) NOT NULL,
'horse_power' INT UNSIGNED NOT NULL,
'weight' DECIMAL NOT NULL,
'fuel_consumption' DECIMAL
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS 'tin-mp2'.'Driver_Gokart'
(
'id' INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
'lap_time' DECIMAL NOT NULL,
'wet_track' BOOLEAN NOT NULL,
CONSTRAINT 'driver_fk' FOREIGN KEY 'driver_id' REFERENCES 'tin-mp2'.'Driver' ('id'),
CONSTRAINT 'gokart_fk' FOREIGN KEY 'gokart_id' REFERENCES 'tin-mp2'.'Gokart' ('id')
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO 'tin-mp2'.'Driver' (id, first_name, last_name, birthdate, weight, phone_number) VALUES
(1, 'Michał', 'Ruszczak', '1999-02-12', 75, '993 233 423'),
(2, 'Krzysztof', 'Mech', '1999-02-02', 80, '793 444 423'),
(3, 'Piotr', 'Malenka', '1995-06-12', 60, null);

INSERT IGNORE INTO 'tin-mp2'.'Gokart' (id, brand, model, color, horse_power, weight, fuel_consumption) VALUES
(1, 'BMW', 'M3', 'czerwony', 15, 125, null),
(2, 'Audi', 'A4', 'zielony', 20, 135, 3.5),
(3, 'Mercedes', 'AMG', 'niebieski', 10, 150, 5);

INSERT IGNORE INTO 'tin-mp2'.'DriverGokart'(id, driver_id, gokart_id, lap_time, wet_track) VALUES
(1, 1, 1, 25.133, true),
(2, 1, 3, 26.232, false),
(3, 2, 3, 27.544, false),
(4, 3, 2, 23.411, true),
(5, 3, 1, 21.743, false);