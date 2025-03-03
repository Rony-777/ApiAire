\c postgres
DROP DATABASE If EXISTS aire_final;
CREATE DATABASE aire_final;
\c aire_final

CREATE TABLE usuario(
    id serial NOT NULL,
    nombre VARCHAR(255),
    email VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMP,
    password VARCHAR(128),
    PRIMARY KEY (id)
);

CREATE TABLE datos_aire(
    id serial PRIMARY KEY,
    CO_ppm REAL,
    temp REAL,
    pm25 REAL,
    fecha_lectura TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);