const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { nextTick } = require('async');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/',
    validateSignup,
    async (req, res, next) => {
        const { email, password, username, firstName, lastName } = req.body;

        const userCheck = await User.findOne({
            where: {
                email
            }
        })

        const err = {
            message: "User already exists",
            statusCode: 403,
            errors: {}
        };
        if (userCheck) {
            err.errors.email = "User with that email already exists"
        }

        if (!email) {
            err.errors.email = "Invalid email"
        }
        if (!firstName) {
            err.errors.firstName = "First Name is required"
        }
        if (!lastName) {
            err.errors.lastName = "Last Name is required"
        }

        const user = await User.signup({ email, username, password, firstName, lastName });

        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
);

module.exports = router;
