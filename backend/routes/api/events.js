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

router.put('/:eventId', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    if (!event) {
        res.json({
            message: "Event couldn\'t be found",
            statusCode: 404
        })
    }

    const group = await Group.findOne({
        where: {
            id: event.groupId
        }
    });

    const userMembership = await Membership.findOne({
        where: {
            userId: user.id,
            groupId: group.id
        }
    });

    let check = false;
    if (userMembership) {
        if (userMembership.status === 'co-host') {
            check = true;
        }
    };
    if (user.id === group.organizerId) {
        check = true;
    }

    if (check !== true) {
        const err = {};
        err.message = 'Must be the group organizer or co-host to edit event.';

        if (user) {
            err.statusCode = 403;
            res.statusCode = 403;
        } else {
            res.statusCode = 401;
            res.statusCode = 401;
        }

        res.json(err);
    }

    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const changedData = { venueId, name, type, capacity, price, description, startDate, endDate }
    const err = {
        message: "Validation error",
        statusCode: 400,
        errors: {}
    }
    if (!venueId) {
        delete changedData.venueId;
    } else {
        const venue = await Venue.findByPk(venueId)
        if (!venue) {
            res.json({
                "message": "Venue couldn't be found",
                "statusCode": 404
              })
        }
    }
    if (!name) {
        delete changedData.name;
    } else if (name.length <5) {
        err.errors.name = "Name must be at least 5 characters"
    }
    if (!type) {
        delete changedData.type;
    } else if (type !== 'Online' && type !== 'In person') {
        err.errors.type = "Type must be Online or In person"
    }
    if (!capacity) {
        delete changedData.capacity;
    } else if (!Number.isInteger(capacity)) {
        err.errors.capacity = "Capacity must be an integer"
    }
    if (!price) {
        delete changedData.price;
    } else if (price < 0) {
        err.errors.price = "Price is invalid"
    }
    if (!description) {
        delete changedData.description;
    }
    if (!startDate) {
        delete changedData.startDate;
    } else {
        const now = new Date();
        if (startDate <= now) {
            err.errors.startDate = "Start date must be in the future"
        }
    }
    if (!endDate) {
        delete changedData.endDate;
    } else {
        if (startDate && !err.errors.startDate) {
            if (endDate <= startDate) {
                err.errors.venueId = "End date is less than start date"
            }
        } else {
            const origionalStartDate = event.startDate;
            if (endDate <= origionalStartDate) {
                err.errors.venueId = "End date is less than start date"
            }
        }
    }

    if (Object.keys(err.errors).length) {
        res.json(err)
    } else {
        event.set(changedData);
        await event.save();

        const editedEvent = await Event.findByPk(eventId, {
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt'
                ]
            }
        })

        res.json(editedEvent);
    }
})

module.exports = router;
