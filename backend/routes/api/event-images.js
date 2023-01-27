const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Event, Venue, GroupImage, EventImage, Group, User, Attendance, sequelize } = require('../../db/models');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const { user } = req;
    const { imageId } = req.params;

    const image = await EventImage.findByPk(imageId);

    if (!image) {
        const err = {};
        err.message = 'Event Image couldn\'t be found';
        err.statusCode = 404;
        res.statusCode = 404;
        res.json(err);
    };

    const event = await Event.findByPk(image.eventId);
    const group = await Group.findByPk(event.groupId);
    const organizerId = group.organizerId;

    if (user.id !== organizerId) {
        const err = {};
        err.message = 'Forbidden';
        err.statusCode = 403;
        res.statusCode = 403;
        res.json(err);
    };

    await image.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
})

module.exports = router;
