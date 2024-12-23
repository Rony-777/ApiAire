\c postgres
DROP DATABASE If EXISTS aire_final;
CREATE DATABASE aire_final;
\c aire_final

CREATE TABLE usuario(
    id serial NOT NULL,
    nombre VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(128),
    PRIMARY KEY (id)
);