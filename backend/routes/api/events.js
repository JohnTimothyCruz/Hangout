const express = require('express');
const { Event, Venue, EventImage, Group, User, Attendance, sequelize } = require('../../db/models');
const router = express.Router();

router.get('/:eventId', async(req, res, next) => {
    const event = await Event.findByPk(req.params.eventId, {
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt'
            ]
        },
        include: [{
            model: Group,
            attributes: {
                exclude: [
                    'organizerId',
                    'about',
                    'type',
                    'createdAt',
                    'updatedAt'
                ]
            }
        },
        {
            model: Venue,
            attributes: {
                exclude: [
                    'groupId',
                    'createdAt',
                    'updatedAt'
                ]
            }
        },
        {
            model: EventImage,
            attributes: {
                exclude: [
                    'eventId',
                    'createdAt',
                    'updatedAt'
                ]
            }
        },
    ]
    });

    if (!event) {
        const err = {};
        err.message = 'Event couldn\'t be found';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    };

    const attendees = await Attendance.findAll({
        where: {
            eventId: req.params.eventId
        }
    });

    event.toJSON();
    event.dataValues.numAttending = attendees.length;

    res.json(event);
});

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
