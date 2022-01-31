const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//Reduce the movies properties down to these essential properties
const reduceMovies = reduceProperties("theater_id", {
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    image_url: ["movies", null, "image_url"],
});

function list() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("*")
        .then(reduceMovies);
}

module.exports = {
    list,
};