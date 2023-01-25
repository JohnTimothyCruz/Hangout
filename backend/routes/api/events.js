const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Event, Venue, Membership, EventImage, Group, User, Attendance, sequelize } = require('../../db/models');
const router = express.Router();

router.get('/:eventId/attendees', async (req, res, next) => {

    const { user } = req;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);
    const group = await Group.findByPk(event.groupId);

    const pagination = {};
    pagination.status = {
        [Op.not]: 'pending'
    }

    if (user) {
        const userMembership = await Membership.findOne({
            where: {
                userId: user.id,
                groupId: group.id
            }
        });
        if (userMembership) {
            if (userMembership.status === 'co-host' || user.id === group.organizerId) {
                delete pagination.status;
            };
        };
    };

    const attendees = await Attendance.findAll({
        where: {
            eventId: req.params.eventId,
            ...pagination
        },
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt'
            ],
        },
    });

    for (const attendant of attendees) {
        const status = attendant.status;
        const userId = attendant.userId;

        delete attendant.dataValues.userId;
        delete attendant.dataValues.status;

        const { firstName, lastName } = await User.findByPk(userId);

        attendant.dataValues.firstName = firstName;
        attendant.dataValues.lastName = lastName;
        attendant.dataValues.Attendance = {
            status
        };
    }

    res.json(attendees)
});

router.get('/:eventId', async (req, res, next) => {
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
