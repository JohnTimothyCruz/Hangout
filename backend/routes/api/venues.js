const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Event, Venue, Membership, EventImage, Group, User, Attendance, sequelize } = require('../../db/models');
const router = express.Router();

router.put('/:venueId', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { venueId } = req.params;

    const venue = await Venue.findByPk(venueId);

    if (!venue) {
        res.json({
            message: "Venue couldn\'t be found",
            statusCode: 404
        })
    }

    const group = await Group.findOne({
        where: {
            id: venue.groupId
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

    const { address, city, state, lat, lng} = req.body;
    const changedData = { address, city, state, lat, lng};

    const err = {
        message: "Validation error",
        statusCode: 400,
        errors: {}
    }
    if (!address) {
        delete changedData.address;
        err.errors.address = "Street address is required"
    }
    if (!city) {
        delete changedData.city;
        err.errors.city = "City is required"
    }
    if (!state) {
        delete changedData.state;
        err.errors.state = "State is required"
    }
    if (!lat || lat < -90 || lat > 90) {
        delete changedData.lat;
        err.errors.lat = "Latitude is not valid"
    }
    if (!lng || lng < -180 || lng < -180) {
        delete changedData.lng;
        err.errors.lng = "Longitude is not valid"
    }

    if (Object.keys(err.errors).length) {
        res.json(err)
    } else {
        venue.set(changedData);
        await venue.save();

        const editedVenue = await Venue.findByPk(venue.id, {
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt'
                ]
            }
        })

        res.json(editedVenue);
    }
})

module.exports = router;
