const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// const validateLogin = [
//     check('credential')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage('Please provide a valid email or username.'),
//     check('password')
//         .exists({ checkFalsy: true })
//         .withMessage('Please provide a password.'),
//     handleValidationErrors
// ];

// Log in
router.post(
    '/',
    // validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const err = {
            message: "Validation error",
            statusCode: 400,
            errors: {}
        }
        if (!credential) {
            err.errors.email = "Email is required"
        }
        if (!password) {
            err.errors.password = "Password is required"
        }
        if (Object.keys(err.errors).length) {
            res.statusCode = 400
            return next(err)
        }

        const user = await User.login({ credential, password });
        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get('/', restoreUser, (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({ user: null });
    }
);

module.exports = router;
