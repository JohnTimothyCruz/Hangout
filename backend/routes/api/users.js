const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
router.post('/', validateSignup, async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        const user = await User.signup({ email, username, password, firstName, lastName });

        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
);

module.exports = router;

// {
//   "email": "test@user.one",
//   "password": "password",
//   "username": "testUserOne",
//   "firstName": "One",
//   "lastName": "One"
// }

// {
//     "email": "test@user.two",
//     "password": "password",
//     "username": "TestUserTwo",
//     "firstName": "Two",
//     "lastName": "Two"
// }

// {
//     "name": "Evening Tennis on the Water",
//     "about": "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
//     "type": "In person",
//     "private": true,
//     "city": "New York",
//     "state": "NY",
//   }

// {
//     "venueId": 1,
//     "name": "Tennis Group First Meet and Greet",
//     "type": "Online",
//     "capacity": 10,
//     "price": 18.50,
//     "description": "The first meet and greet for our group! Come say hello!",
//     "startDate": "2028-11-19 20:00:00",
//     "endDate": "2028-11-19 22:00:00"
//   }
