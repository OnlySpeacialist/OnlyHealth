const express = require('express');
const router = express.Router();
const { getEvents, createEvent, deleteEvent } = require('../controllers/events');

router.get('/get_events', getEvents);
router.post('/add_events', createEvent);
router.delete('/delete_event/:id', deleteEvent);

module.exports = router;