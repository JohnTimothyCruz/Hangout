const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Event, Venue, Membership, EventImage, Group, User, Attendance, sequelize } = require('../../db/models');
const { response } = require('express');
const router = express.Router();

router.get('/:eventId/attendees', async (req, res, next) => {

    const { user } = req;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    if (!event) {
        res.statusCode = 404
        res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }

    const group = await Group.findByPk(event.groupId);

    const pagination = {};

    if (user) {
        const userMembership = await Membership.findOne({
            where: {
                userId: user.id,
                groupId: group.id
            }
        });
        if (user.id !== group.organizerId) {
            if (userMembership) {
                if (userMembership.status === 'co-host') {
                    pagination.status = {
                        [Op.not]: 'pending'
                    }
                };
            }
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

    res.json({
        Attendees: attendees
    })
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

    let { page, size, name, type, startDate } = req.query;
    let pagination = {
        where: {}
    };

    const err = {
        message: "Validation Error",
        statusCode: 400,
        errors: {}
    };

    if (!page) {
        page = 1
    } else {
        if (page < 1) {
            err.errors.page = "Page must be greater than or equal to 1"
        }
        if (!Number.isInteger(page)) {
            err.errors.page = "Page must be a whole number"
        }
    }
    if (!size) {
        size = 20
    } else {
        if (size < 1) {
            err.errors.page = "Size must be greater than or equal to 1"
        }
        if (!Number.isInteger(size)) {
            err.errors.size = "Size must be a whole number"
        }
    }

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offest = size * (page - 1);
    }

    if (name) {
        if (typeof name !== 'string') {
            err.errors.name = "Name must be a string"
        } else {
            pagination.where.name = name
        }
    }
    if (type) {
        if (type !== 'Online' && type !== 'In Person') {
            err.errors.type = "Type must be 'Online' or 'In Person'"
        } else {
            pagination.where.type = type
        }
    }
    if (startDate) {
        const userDate = new Date(startDate);
        if (userDate.toString().includes('Invalid')) {
            err.errors.startDate = "Start date must be a valid datetime"
        } else {
            pagination.where.startDate = startDate
        }
    }

    const allEvents = await Event.findAll({
        include: [Venue, Group],
        ...pagination
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

router.post('/:eventId/images', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { eventId } = req.params;
    const { url, preview } = req.body;

    const event = await Event.findByPk(eventId);

    if (!event) {
        res.statusCode = 404;
        res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }

    const userAttendee = await Attendance.findOne({
        where: {
            eventId,
            userId: user.id
        }
    });

    const group = await Group.findByPk(event.groupId);
    const userMembership = await Membership.findOne({
        where: {
            userId: user.id,
            groupId: group.id
        }
    })

    let check = false;
    const err = {
        message: 'Only attendees, co-hosts, or the organizer can post picture.',
        statusCode: 403
    };
    if (user.id !== group.organizerId) {
        if (userMembership) {
            if (userMembership.status !== 'co-host') {
                check = true
            }
        }
        if (userAttendee) {
            if (userAttendee.status !== 'attendee') {
                check = true
            }
        }
    }
    if (check) {
        res.statusCode = 403
        res.json(err)
    }

    if (!url) {
        const err = {};
        err.message = 'Please enter a url.';
        err.statusCode = 400;
        res.statusCode = 400;
        res.json(err);
    }

    if (preview !== true && preview !== false) {
        const err = {};
        err.message = 'Preview has to be boolean.';
        err.statusCode = 400;
        res.statusCode = 400;
        res.json(err);
    };

    const newImage = EventImage.build({
        eventId,
        preview,
        url
    })

    await newImage.save();

    const createdImage = await EventImage.findByPk(newImage.id, {
        attributes: {
            exclude: [
                'eventId',
                'createdAt',
                'updatedAt'
            ]
        }
    })

    res.json(createdImage)
})

router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    if (!event) {
        res.statusCode = 404
        res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }

    const group = await Group.findByPk(event.groupId);
    const userMembership = await Membership.findOne({
        where: {
            userId: user.id,
            groupId: group.id
        }
    });

    console.log(userMembership)

    if (!userMembership) {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    } else {
    const attendance = await Attendance.findOne({
        where: {
            userId: user.id,
            eventId
        }
    })

    if (attendance) {
        if (attendance.status === 'pending') {
            res.statusCode = 400
            res.json({
                message: "Attendance has already been requested",
                statusCode: 400
            })
        }
        if (attendance.status === 'waitlist' || attendance.status === 'attendee') {
            res.statusCode = 400
            res.json({
                message: "User is already an attendee of the event",
                statusCode: 400
            })
        }
    }

    const newAttendanceRequest = Attendance.build({
        eventId,
        userId: user.id,
        status: 'pending'
    })

    await newAttendanceRequest.save();

    res.json({
        userId: user.id,
        status: 'pending'
    });
}
})

router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { eventId } = req.params;
    const { userId, status } = req.body;

    const event = await Event.findByPk(eventId);

    if (!event) {
        res.statusCode = 404
        res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }

    const group = await Group.findByPk(event.groupId);
    const userMembership = await Membership.findOne({
        userId: user.id,
        groupId: group.id
    });

    if (user.id !== group.organizerId && userMembership.status !== 'co-host') {
        res.statusCode = 403;
        res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    const attendanceRequest = await Attendance.findOne({
        where: {
            eventId,
            userId,
        }
    });

    if (!attendanceRequest) {
        res.statusCode = 404
        res.json({
            message: "Attendance between the user and the event does not exist",
            statusCode: 404
        })
    };

    if (status === 'pending') {
        res.statusCode = 400
        res.json({
            message: "Cannot change an attendance status to pending",
            statusCode: 400
        })
    }

    if (status !== 'attending' && status !== 'waitlist') {
        res.statusCode = 400
        res.json({
            message: "Please enter a valid status",
            statusCode: 400
        })
    }

    attendanceRequest.set({
        status
    });

    await attendanceRequest.save();

    const createdRequest = await Attendance.findByPk(attendanceRequest.id, {
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt'
            ]
        }
    })

    res.json(createdRequest)
})

router.put('/:eventId', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    if (!event) {
        res.statusCode = 404;
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

        if (user) {
            err.statusCode = 403;
            res.statusCode = 403;
            err.message = 'Forbidden';
        } else {
            res.statusCode = 401;
            res.statusCode = 401;
            err.message = 'Authentication required'
        }

        res.json(err);
    }

    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const changedData = { venueId, name, type, capacity, price, description, startDate, endDate };
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
            res.statusCode = 404;
            res.json({
                "message": "Venue couldn't be found",
                "statusCode": 404
            })
        }
    }


    if (!name) {
        delete changedData.name;
    } else {
        const nameCheck = await Event.findOne({
            where: {
                name
            }
        })
        if (nameCheck) {
            err.errors.name = "Name must be unique"
        } else if (name.length < 5) {
            err.errors.name = "Name must be at least 5 characters"
        }
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
        if (new Date(startDate)) {
            if (new Date(startDate).getTime() <= new Date().getTime()) {
                err.errors.startDate = "Start date must be in the future"
            }
        } else {
            err.errors.startDate = "Start date must be in the future"
        }
    }
    if (!endDate) {
        delete changedData.endDate;
    } else {
        if (new Date(endDate)) {
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
            err.errors.venueId = "End date is less than start date"
        }
    }

    if (Object.keys(err.errors).length) {
        console.log(err)
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

router.delete('/:eventId/attendance', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { eventId } = req.params;
    const { userId } = req.body;

    const event = await Event.findByPk(eventId);

    if (!event) {
        res.statusCode = 404,
            res.json({
                message: "Event couldn't be found",
                statusCode: 404
            })
    }

    const group = await Group.findByPk(event.groupId);

    if (user.id !== group.organizerId && user.id !== userId) {
        res.statusCode = 403,
            res.json({
                message: 'Forbidden',
                statusCode: 403
            })
    }

    const attendanceRequest = await Attendance.findOne({
        where: {
            userId,
            eventId
        }
    });

    if (!attendanceRequest) {
        res.statusCode = 404;
        res.json({
            message: "Attendance does not exist for this User",
            statusCode: 404
        })
    };

    await attendanceRequest.destroy();

    res.json({
        message: "Successfully deleted attendance from event"
    })
})

router.delete('/:eventId', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);

    if (!event) {
        res.statusCode = 404;
        res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }

    const group = await Group.findByPk(event.groupId);
    const userMembership = await Membership.findOne({
        where: {
            userId: user.id,
            groupId: event.groupId
        }
    })

    if (user.id !== group.organizerId) {
        if (userMembership) {
            if (userMembership.status !== 'co-host') {
                res.statusCode = 403;
                res.json({
                    message: 'Forbidden',
                    statusCode: 403
                })
            }
        }
    }

    if (!event) {
        res.statusCode = 404;
        res.json({
            message: "Event couldn't be found",
            statusCode: 404
        })
    }

    await event.destroy();

    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;
