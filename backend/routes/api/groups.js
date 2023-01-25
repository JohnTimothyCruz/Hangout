const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Event, Venue, Membership, Group, GroupImage, User, Attendance, sequelize } = require('../../db/models');
const router = express.Router();

const validateGroup = [
    check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please include a group name.'),

    check('name')
    .isLength({min: 1, max: 30})
    .withMessage('Name must be less than 30 characters.'),

    check('about')
    .exists({ checkFalsy: true })
    .withMessage('Please include an about page.'),

    check('type')
    .exists({ checkFalsy: true })
    .custom(val => val === 'In person' || val === 'Online')
    .withMessage('Please enter a valid group type.'),

    check('private')
    .exists({ checkFalsy: true })
    .custom(val => val === true || val === false)
    .withMessage('Private must be either true or false.'),

    check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a city name.'),

    check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a state.'),

    handleValidationErrors
]

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

        group.toJSON();
        group.dataValues.previewImage = image[0].url;
        group.dataValues.numMembers = members.length;
        groups.push(group);
    }

    res.json({
        Groups: groups
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

        group.toJSON();
        group.dataValues.previewImage = image[0].url;
        group.dataValues.numMembers = members.length;
        groups.push(group);
    }

    res.json({
        Groups: groups
    });
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

module.exports = router;
