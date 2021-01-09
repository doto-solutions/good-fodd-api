create schema recipe;

create table recipe.recipe (
    id serial primary key,
    name varchar not null,
    description text,
    nutrition integer [],
    tags text [],
    submitted timestamp default current_timestamp,
    numberOfSteps integer [],
    steps text [],
    ingredients text [],
    numberOfIngredients integer not null
);