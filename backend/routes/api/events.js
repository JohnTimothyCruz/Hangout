const express = require('express');
const { Event, Venue, Group, User, Attendance, sequelize } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const allEvents = await Event.findAll({
        include: [Venue, Group],
    });

    const events = [];

    for (let event of allEvents) {

        const attendees = await Attendance.findAll({
            where: {
                eventId: event.id
            },
        })

        event.toJSON();
        event.dataValues.numAttending = attendees.length
        events.push(event)
    }

    res.json({
        Events: events,
    });
});

module.exports = router;
