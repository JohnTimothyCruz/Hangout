const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Event, Venue, Membership, Group, GroupImage, User, Attendance, sequelize } = require('../../db/models');
const { up } = require('../../db/seeders/20230124003229-demo-attendance');
const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {

    const { user } = req;

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

    const group = await Group.findByPk(groupId);

    if (!group) {
        const err = {};
        err.message = 'Group couldn\'t be found.';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    };

    const pagination = {};
    if (user.id !== group.organizerId) {
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

    res.json({
        Members: members
    });
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

    res.json(Events)
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
    const allGroups = await Group.findAll({
        include: [GroupImage, Event]
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

    res.json(groups);
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
        err.message = 'Forbidden';
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

    if (preview !== true && preview !== false) {
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

        if (user) {
            err.statusCode = 403;
            res.statusCode = 403;
            err.message = 'Forbidden'
        } else {
            err.statusCode = 401;
            res.statusCode = 401;
            err.message = 'Authentication required'
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
        err.errors.address = "Street address is required"
    }
    if (!city) {
        err.errors.city = "City is required"
    }
    if (!state) {
        err.errors.state = "State is required"
    }
    if (!lat || lat < -90 || lat > 90) {
        err.errors.lat = "Latitude is not valid"
    }
    if (!lng || lng < -180 || lng < -180) {
        err.errors.lng = "Longitude is not valid"
    }

    if (Object.keys(err.errors).length) {
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

router.post('/:groupId/membership', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { groupId } = req.params;

    const group = await Group.findByPk(groupId);

    if (!group) {
        res.statusCode = 404;
        res.json({
            message: "Group couldn't be found",
            statusCode: 404
        })
    };

    const userMembership = await Membership.findOne({
        where: {
            userId: user.id,
            groupId
        }
    });

    if (userMembership) {
        if (userMembership.status === 'pending') {
            res.statusCode = 400;
            res.json({
                message: "Membership has already been requested",
                statusCode: 400
            })
        } else if (userMembership.status === 'member' || userMembership.status === 'co-host') {
            res.statusCode = 400;
            res.json({
                message: "User is already a member of the group",
                statusCode: 400
            })
        }
    }

    const newUserMembership = Membership.build({
        userId: user.id,
        groupId,
        status: 'pending'
    });

    await newUserMembership.save();

    res.json({
        memberId: newUserMembership.id,
        status: "pending"
    });
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

        if (user) {
            err.statusCode = 403;
            res.statusCode = 403;
            err.message = 'Forbidden'
        } else {
            err.statusCode = 401;
            res.statusCode = 401;
            err.message = 'Authentication required'
        }

        res.json(err);
    }

    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

    const err = {
        message: 'Validation error',
        statusCode: 400,
        errors: {}
    };

    const nameCheck = await Event.findOne({
        where: {
            name
        }
    })

    if (nameCheck) {
        err.errors.name = "Name must be unique"
    }
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

    if (Object.keys(err.errors).length) {
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

router.post('/', requireAuth, async (req, res, next) => {

    console.log('req')

    const { name, about, type, private, city, state } = req.body;
    const { user } = req;

    const err = {
        message: 'Validation Error',
        statusCode: 400,
        errors: {}
    };

    const nameCheck = await Group.findOne({
        where: {
            name
        }
    })

    if (nameCheck) {
        err.errors.name = "Name must be unique"
    }
    if (!name || name.length > 60) {
        err.errors.name = "Name must be 60 characters or less"
    }
    if (!about || about.length < 50) {
        err.errors.about = "About must be 50 characters or more"
    }
    if (!type || type !== "Online" && type !== "In person") {
        err.errors.type = "Type must be 'Online' or 'In person'"
    }
    if (private !== true && private !== false) {
        err.errors.private = "Private must be boolean"
    }
    if (!city) {
        err.errors.city = "City is required"
    }
    if (!state) {
        err.errors.state = "State is required"
    }

    if (Object.keys(err.errors).length) {
        res.statusCode = 400;
        res.json(err);
    }

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

    const createdGroup = await Group.findByPk(newGroup.id, {
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt'
            ]
        }
    })

    res.statusCode = 201;
    res.json(createdGroup);
})

router.put('/:groupId/membership', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { groupId } = req.params;
    const { memberId, status } = req.body;

    const group = await Group.findByPk(groupId);

    if (!group) {
        res.statusCode = 404;
        res.json({
            message: "Group couldn't be found",
            statusCode: 404,
        })
    }

    if (user.id !== group.organizerId) {
        const membership = await Membership.findOne({
            where: {
                groupId: group.id,
                userId: user.id
            }
        })
        if (!membership) {
            const err = {};
            err.message = 'Forbidden';
            err.statusCode = 403;
            res.statusCode = 403;
            res.json(err);
        } else {
            if (membership.status !== 'co-host') {
                const err = {};
                err.message = 'Forbidden';
                err.statusCode = 403;
                res.statusCode = 403;
                res.json(err);
            }
        }
    }

    const userMembership = await Membership.findOne({
        where: {
            userId: memberId
        }
    });

    if (!userMembership) {
        res.statusCode = 400;
        res.json({
            message: "Membership between the user and the group does not exist",
            statusCode: 400,
        })
    }

    const chosenUser = await User.findByPk(userMembership.userId);

    if (!chosenUser) {
        res.statusCode = 400;
        res.json({
            message: "Validaition Error",
            statusCode: 400,
            errors: {
                memberId: "User couldn't be found"
            }
        })
    }

    if (!status) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                memberId: "Please enter a valid status"
            }
        })
    }

    if (status === 'pending') {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                status: "Cannot change a membership status to pending"
            }
        })
    }

    if (status !== 'member' && status !== 'co-host') {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                status: "Please enter a valid status"
            }
        })
    }

    userMembership.set({
        status
    })

    await userMembership.save();

    const updatedMembership = await Membership.findByPk(userMembership.id, {
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt'
            ]
        }
    })

    res.json(updatedMembership)
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
        err.message = 'Forbidden';
        err.statusCode = 403;
        res.statusCode = 403;
        res.json(err);
    };

    const group = await Group.findByPk(groupId);

    const { name, about, type, private, city, state } = req.body;
    const changedData = { name, about, type, private, city, state };

    const err = {
        message: "Validation error",
        statusCode: 400,
        errors: {}
    }
    if (!name) {
        delete changedData.name;
    } else if (name.length > 60) {
        err.errors.name = 'Name must be 60 characters or less'
    }
    if (!about) {
        delete changedData.about;
    } else if (about.length < 50) {
        err.errors.about = 'About must be 50 characters or more'
    }
    if (!type) {
        delete changedData.type;
    } else if (type !== 'Online' && type !== 'In person') {
        err.errors.type = 'Type must be \'Online\' or \'In person\''
    }
    if (!private && private !== false) {
        delete changedData.private;
    } else if (private !== true && private !== false) {
        err.errors.private = 'Private must be a boolean'
    }
    if (!city && city !== null) {
        delete changedData.city;
    } else if (city === null) {
        err.errors.city = 'City is required'
    }
    if (!state && state !== null) {
        delete changedData.state;
    } else if (state === null) {
        err.errors.state = 'State is required'
    }

    if (Object.keys(err.errors).length) {
        res.json(err)
    } else {
        group.set(changedData);
        await group.save();

        const editedGroup = await Group.findByPk(group.id, {
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt'
                ]
            }
        })

        res.json(editedGroup);
    }
})

router.delete('/:groupId/membership', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { groupId } = req.params;
    const { memberId } = req.body;

    const group = await Group.findByPk(groupId);

    if (user.id !== memberId && user.id !== group.organizerId) {
        res.statusCode = 403;
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    if (!group) {
        res.statusCode = 404;
        res.json({
            message: "Group couldn't be found",
            statusCode: 404
        })
    }

    const userMembership = await Membership.findOne({
        where: {
            userId: memberId
        }
    });

    if (!userMembership) {
        res.statusCode = 404;
        res.json({
            message: "Membership does not exist for this User",
            statusCode: 404
        })
    }

    const toDeleteUser = await User.findByPk(userMembership.userId);

    if (!toDeleteUser) {
        res.statusCode = 400;
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                memberId: "User couldn't be found"
            }
        })
    }

    await userMembership.destroy();

    res.json({
        message: "Successfully deleted membership from group"
    })

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
        err.message = 'Forbidden';
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
