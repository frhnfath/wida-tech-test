const { User } = require('../models');
const jwt = require('jsonwebtoken');
const signToken = id => {
    console.log("env: ", process.env.JWT_SECRET)
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const registerUser = async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(404).json({
            message: "Error, missing data",
        })
    }
    try {
        console.log('user body:', req.body);
        let {username, email, password} = req.body;
        const newUser = await User.create({
            username, email, password
        });
        const token = signToken(newUser.id)
        return res.status(201).json({
            message: "Success",
            token,
            data: newUser
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error",
            error
        })
    }
}

const loginUser = async (req, res) => {
    // validate username or password
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            status: "Failed",
            message: "Error",
            error: "Please input username or password"
        });
    }

    // validate if user on db
    const userData = await User.findOne({where: {
        username: req.body.username
    }});

    if (!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
        return res.status(400).json({
            status: "Failed",
            message: "Error Login",
            error: "Invalid Username or Password"
        })
    }

    //token di response pada login
    const token = signToken(userData.id);
    return res.status(200).json({
        status: "Success",
        message: "Login Success",
        token
    })
}

module.exports = {
    loginUser,
    registerUser
}