CREATE DATABASE IF NOT EXISTS herbario_boticario;
USE herbario_boticario;

CREATE TABLE IF NOT EXISTS planta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nombre_cientifico VARCHAR(150),
    descripcion TEXT
);

CREATE TABLE IF NOT EXISTS receta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    instrucciones TEXT NOT NULL,
    uso VARCHAR(255),
    planta_id INT NOT NULL,
    FOREIGN KEY (planta_id) REFERENCES planta(id)
);
