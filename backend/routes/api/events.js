const express = require('express');
const { Event, sequelize } = require('../../db/models');
const router = express.Router();

router.get('/', async(req, res, next) => {
    const allEvents = await Event.findAll({
        include: ['Venue', 'Group'],
    });

    res.json({
        Events: allEvents,
    });
});

module.exports = router;
