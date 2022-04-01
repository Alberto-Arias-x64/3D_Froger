CREATE DATABASE IF NOT EXISTS compani;
USE compani;
CREATE TABLE IF NOT EXISTS articulos(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    precio INT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    stock INT NOT NULL, 
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    descripcion TEXT,
    imagen VARCHAR(255)
);
DESCRIBE articulos;

SELECT * FROM articulos ORDER BY fecha DESC LIMIT 2;

SELECT id FROM articulos WHERE categoria = 'Arte' LIMIT 40;
SELECT id,nombre,precio,imagen FROM articulos WHERE stock != 0 ORDER BY fecha DESC LIMIT 12;
SELECT * FROM articulos WHERE nombre LIKE '%simio%'