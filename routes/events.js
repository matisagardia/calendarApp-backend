const { Router } = require("express");
const { validateJWT } = require('../middlewares/validateJWT');
const {getEvent, createEvent, updateEvent, deleteEvent} = require('../controllers/events')


const router = Router();


// Get events 

router.get('/', validateJWT, getEvent);

// Create new events

router.post('/', validateJWT, createEvent);

// Update event

router.put('/:id', validateJWT, updateEvent);

// Delete event

router.delete('/:id', validateJWT, deleteEvent);



module.exports = router;