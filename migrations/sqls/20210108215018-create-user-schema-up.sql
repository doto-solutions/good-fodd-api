CREATE SCHEMA personal;

CREATE TABLE personal.person (
    id serial PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    created_at timestamp DEFAULT now()
);