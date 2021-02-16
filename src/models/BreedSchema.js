const mongoose = require('mongoose');

const BreedSchema = mongoose.Schema({
    source: String,
    name: String,
    height: String,
    lifespan: String,
    type: String,
    link: String,
});

const BreedModel = mongoose.model("breed", BreedSchema);

module.exports = BreedModel;