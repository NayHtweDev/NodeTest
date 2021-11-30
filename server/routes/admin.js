const express = require('express');

const path = require('path');

const router = express.Router();

const AuthenticationController = require("../controllers/AuthenticationController");



// authentication
router.post("/api/auth/register",
AuthenticationController.register)

router.post("/api/auth/login",
AuthenticationController.login)


router.post("/api/auth/logout",
AuthenticationController.logout)


//Parent product


module.exports = router;