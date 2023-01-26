const express = require('express');
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Event, Venue, Membership, Group, GroupImage, User, Attendance, sequelize } = require('../../db/models');
const router = express.Router();

const validateGroup = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 60 })
        .withMessage('Name must be 60 characters or less'),

    check('about')
        .exists({ checkFalsy: true })
        .withMessage('About must be 50 characters or more'),

    check('type')
        .exists({ checkFalsy: true })
        .custom(val => val === 'In person' || val === 'Online')
        .withMessage('Type must be \'Online\' or \'In person\''),

    check('private')
        .exists({ checkFalsy: true })
        .custom(val => val === true || val === false)
        .withMessage('Private must be a boolean'),

    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),

    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),

    handleValidationErrors
]

router.get('/current', requireAuth, async (req, res, next) => {

    const { user } = req;

    console.log(user)

    const allGroups = await Group.findAll({
        where: {
            organizerId: user.id
        }
    });

    const groups = [];

    for (let group of allGroups) {

        const image = await GroupImage.findAll({
            where: {
                groupId: group.id
            },
        });

        const members = await Membership.findAll({
            where: {
                groupId: group.id
            }
        });

        if (image[0]) {
            group.dataValues.previewImage = image[0].url;
        } else {
            group.dataValues.previewImage = null
        }
        group.dataValues.numMembers = members.length;
        groups.push(group);
    }

    res.json({
        Groups: groups
    });
})

router.get('/:groupId/members', async (req, res, next) => {

    const { user } = req;
    const { groupId } = req.params;

    const organizer = await Group.findByPk(groupId);

    if (!organizer) {
        const err = {};
        err.message = 'Group couldn\'t be found.';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    };

    const pagination = {};
    if (user.id !== organizer.organizerId) {
        pagination.status = {
            [Op.not]: 'pending'
        }
    };

    const members = await Membership.findAll({
        where: {
            groupId,
            ...pagination
        },
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt',
            ]
        }
    });

    for (const member of members) {
        member.dataValues.Membership = {
            status: member.dataValues.status
        };
        delete member.dataValues.status;
    };

    res.json(members);
})

router.get('/:groupId/venues', async (req, res, next) => {

    const group = await Group.findByPk(req.params.groupId)

    if (!group) {
        const err = {};
        err.message = 'Group couldn\'t be found';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    };

    const venues = await Venue.findAll({
        where: {
            groupId: req.params.groupId
        },
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt'
            ]
        }
    });

    res.json({
        Venues: venues
    })
})

router.get('/:groupId/events', async (req, res, next) => {

    const group = await Group.findByPk(req.params.groupId)

    const Events = await Event.findAll({
        where: {
            groupId: req.params.groupId
        },
        include: [
            {
                model: Group,
                attributes: {
                    exclude: [
                        'organizerId',
                        'about',
                        'type',
                        'private',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            },
            {
                model: Venue,
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt'
                    ]
                }
            }
        ]
    });

    if (!group) {
        const err = {};
        err.message = 'Group couldn\'t be found';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    };

    res.json({ Events })
})

router.get('/:groupId', async (req, res, next) => {

    const id = req.params.groupId;

    const groupInfo = await Group.findByPk(id, {
        include: [{
            model: GroupImage,
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt'
                ]
            }
        }]
    });

    if (!groupInfo) {
        const err = {};
        err.message = 'Group couldn\'t be found';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    };

    members = await Membership.findAll({
        where: {
            groupId: id
        },
    });

    organizer = await User.findByPk(groupInfo.dataValues.organizerId, {
        attributes: {
            exclude: [
                'username'
            ]
        }
    });

    vennueInfo = await Venue.findAll({
        where: {
            groupId: id
        },
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt'
            ]
        }
    });

    groupInfo.toJSON();
    groupInfo.dataValues.Organizer = organizer;
    groupInfo.dataValues.Venues = vennueInfo;
    groupInfo.dataValues.numMembers = members.length;

    res.json(groupInfo);
})

router.get('/', async (req, res, next) => {
    const allGroups = await Group.findAll();

    const groups = [];

    for (let group of allGroups) {

        const image = await GroupImage.findAll({
            where: {
                groupId: group.id
            },
        });

        const members = await Membership.findAll({
            where: {
                groupId: group.id
            }
        });

        if (image) {
            if (image[0]) {
                group.dataValues.previewImage = image[0].url;
            }
        };
        if (members) {
            group.dataValues.numMembers = members.length;
        };

        groups.push(group);
    }

    res.json({
        Groups: groups
    });
})

router.post('/:groupId/images', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { groupId } = req.params;

    const organizer = await Group.findByPk(groupId);

    if (!organizer) {
        const err = {};
        err.message = 'Group couldn\'t be found.';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    };

    if (user.id !== organizer.organizerId) {
        const err = {};
        err.message = 'You must be the group organizer to make any edits.';
        err.statusCode = 403;
        res.statusCode = 403;
        res.json(err);
    };

    const { url, preview } = req.body;

    if (!url) {
        const err = {};
        err.message = 'Please enter a url.';
        err.statusCode = 400;
        res.statusCode = 400;
        res.json(err);
    };

    if (!preview || preview !== true && preview !== false) {
        const err = {};
        err.message = 'Preview has to be boolean.';
        err.statusCode = 400;
        res.statusCode = 400;
        res.json(err);
    };

    const newGroupImage = GroupImage.build({
        url,
        preview,
        groupId
    });

    await newGroupImage.save();

    const createdNewImage = await GroupImage.findByPk(newGroupImage.id, {
        attributes: {
            exclude: [
                'groupId',
                'updatedAt',
                'createdAt'
            ]
        }
    })

    res.json(createdNewImage);
})

router.post('/:groupId/venues', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { groupId } = req.params;

    const group = await Group.findOne({
        where: {
            id: groupId
        }
    });

    if (!group) {
        const err = {};
        err.message = 'Group couldn\'t be found.';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    }

    const userMembership = await Membership.findOne({
        where: {
            userId: user.id,
            groupId: groupId
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
        err.message = 'Must be the group organizer or co-host to create event.';

        if (user) {
            err.statusCode = 403;
            res.statusCode = 403;
        } else {
            res.statusCode = 401;
            res.statusCode = 401;
        }

        res.json(err);
    }

    const { address, city, state, lat, lng } = req.body;

    const err = {
        message: "Validation error",
        statusCode: 400,
        errors: {}
    }
    if (!address) {
        err.errors = "Street address is required"
    }
    if (!city) {
        err.errors = "City is required"
    }
    if (!state) {
        err.errors = "State is required"
    }
    if (!lat || lat < -90 || lat > 90) {
        err.errors = "Latitude is not valid"
    }
    if (!lng || lng < -180 || lng < -180) {
        err.errors = "Longitude is not valid"
    }

    if (err.errors.length) {
        res.json(err)
    } else {
        const newVenue = Venue.build({
            groupId,
            address,
            city,
            state,
            lat,
            lng
        })

        await newVenue.save();

        const createdVenue = await Venue.findByPk(newVenue.id, {
            attributes: {
                exclude: [
                    'updatedAt',
                    'createdAt'
                ]
            }
        })

        res.json(createdVenue);
    }
})

router.post('/:groupId/events', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { groupId } = req.params;

    const group = await Group.findOne({
        where: {
            id: groupId
        }
    });

    if (!group) {
        const err = {};
        err.message = 'Group couldn\'t be found.';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    }

    const userMembership = await Membership.findOne({
        where: {
            userId: user.id,
            groupId: groupId
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
        err.message = 'Must be the group organizer or co-host to create event.';

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

    const err = {
        message: 'Validation error',
        statusCode: 400,
        errors: {}
    };

    if (!venueId && venueId !== null) {
        err.errors.venueId = "Venue does not exist"
        err.statusCode = 404
        res.json(err)
    };
    if (venueId === null) {
        delete err.errors.venueId
    };
    if (!name || name.length < 5) {
        err.errors.name = "Name must be at least 5 characters"
    };
    if (type !== 'Online' && type !== 'In person') {
        err.errors.type = "Type must be Online or In person"
    };
    if (!Number.isInteger(capacity)) {
        err.errors.capacity = "Capacity must be an integer"
    };
    if (!price || price < 0) {
        err.errors.price = "Price is invalid"
    };
    if (!description) {
        err.errors.description = "Description is required"
    };
    if (!startDate) {
        err.errors.startDate = "Start date must be in the future"
    } else {
        const now = new Date();
        if (startDate <= now) {
            err.errors.startDate = "Start date must be in the future"
        }
    }
    if (!endDate) {
        err.errors.venueId = "End date is less than start date"
    } else {
        if (endDate <= startDate) {
            err.errors.venueId = "End date is less than start date"
        }
    }

    if (err.errors.length) {
        res.json(err);
    } else {
        const newEvent = Event.build({
            groupId,
            venueId,
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate
        });

        await newEvent.save();

        const createdEvent = await Event.findByPk(newEvent.id, {
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt'
                ]
            }
        })

        res.json(createdEvent);
    }
})

router.post('/', requireAuth, validateGroup, async (req, res, next) => {

    const { name, about, type, private, city, state } = req.body;
    const { user } = req;

    const newGroup = Group.build({
        organizerId: user.id,
        name,
        about,
        type,
        private,
        city,
        state
    });

    await newGroup.save()

    res.json(newGroup);
})

router.put('/:groupId', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { groupId } = req.params;

    const organizer = await Group.findByPk(groupId);

    if (!organizer) {
        const err = {};
        err.message = 'Group couldn\'t be found.';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    };

    if (user.id !== organizer.organizerId) {
        const err = {};
        err.message = 'You must be the group organizer to make any edits.';
        err.statusCode = 403;
        res.statusCode = 403;
        res.json(err);
    };

    const group = await Group.findByPk(groupId);

    const { name, about, type, private, city, state } = req.body;
    const changedData = { name, about, type, private, city, state };

    if (!name) {
        delete changedData.name;
    };
    if (!about) {
        delete changedData.name;
    };
    if (!type) {
        delete changedData.name;
    };
    if (!private) {
        delete changedData.name;
    };
    if (!city) {
        delete changedData.name;
    };
    if (!state) {
        delete changedData.name;
    };

    group.set(changedData);
    await group.save();

    res.json(group);
})

router.delete('/:groupId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { groupId } = req.params;

    const organizer = await Group.findByPk(groupId);

    if (!organizer) {
        const err = {};
        err.message = 'Group couldn\'t be found.';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    };

    if (user.id !== organizer.organizerId) {
        const err = {};
        err.message = 'You must be the group organizer to make any edits.';
        err.statusCode = 403;
        res.statusCode = 403;
        res.json(err);
    };

    const group = await Group.findByPk(groupId);

    await group.destroy();

    res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        }
    );
})

module.exports = router;
