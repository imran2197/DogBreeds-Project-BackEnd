const express = require('express');
const BreedModel = require("./models/BreedSchema");
const UserModel = require("./models/UserSchema");
const bcrypt = require('bcrypt');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


const isNullOrUndefined = (value) => value === null || value === undefined;
const SALT = 7;

app.post("/breeds/signup", async (req, res) => {
    const {userName, email, phone, password} = req.body;
    const existingUser = await UserModel.findOne({userName});
    if(isNullOrUndefined(existingUser)){
        const hashedPwd = bcrypt.hashSync(password, SALT);
        const newUser = new UserModel({
            userName, email, phone, password: hashedPwd
        });
        await newUser.save();
        res.status(201).send({Success: "Successfully Signed Up"});
    }else{
        res.status(400).send({Error: `UserName ${userName} Already Exists`});
    }
});

app.post("/breeds/login", async (req, res) => {
    const {userName, password} = req.body;
    const existinguser = await UserModel.findOne({userName});
    if(isNullOrUndefined(existinguser)){
        res.status(404).send({Error: "UserName Does Not Exist"});
    }else{
        const hashedPwd = existinguser.password;
        if(bcrypt.compareSync(password, hashedPwd)){
            res.status(200).send({Success: "Successfully Logged In"});
        }else{
            res.status(401).send({Error: "Password Incorrect"});
        }
    }
});

const AuthMiddleware = async(req, res) => {
    const userName = req.headers["x-username"];
    const password = req.headers["x-password"];

    if(isNullOrUndefined(userName) || isNullOrUndefined(password)){
        res.status(401).send({Error: "UserName/Password Incorrect"});
    }else{
        const existinguser = await UserModel.findOne({userName});
        if(isNullOrUndefined(user)){
            res.status(401).send({Error: "UserName Does Not Exists"});
        }else{
            const hashedPwd = existinguser.password;
            if(bcrypt.compareSync(password, hashedPwd)){
                req.user = existinguser;
                next();
            }else{
                res.status(401).send({Error: "Password Incorrect"});
            }
        }
    }
}


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



module.exports = app;