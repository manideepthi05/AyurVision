const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Test Route
router.get("/test", (req, res) => {
    res.json({
        message: "Auth Route Working"
    });
});

// Signup Route
router.post("/signup", async (req, res) => {
    try {

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        res.json({
            message: "Signup Successful"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

// Login Route
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (user) {

            res.json({
                message: "Login Success",
                user
            });

        } else {

            res.status(401).json({
                message: "Invalid Credentials"
            });

        }

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;