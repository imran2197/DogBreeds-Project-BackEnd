const express = require('express');
const BreedModel = require("./models/BreedSchema");
const UserModel = require("./models/UserSchema");
const bcrypt = require('bcrypt');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/breeds", async (req, res) => {
    const breeds = await BreedModel.find();
    res.status(200).send(breeds);
});

app.get("/breeds/names", async (req, res) => {
    const projectedResult = await BreedModel.find().select({
        height: false,
        lifespan: false,
        _id: false,
        __v: false
    });
    const maxResult = projectedResult.filter((item,idx) => idx < 6);
    res.status(200).send(maxResult);
});

app.post("/breeds", async (req, res) => {
    const body = req.body;
    const newBreed = new BreedModel(body);
    await newBreed.save();
    res.status(201).send(body);
});

app.get("/", (req, res) => {
    res.send("Server Works");
})


module.exports = app;