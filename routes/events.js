const { Router } = require("express");
const { validateJWT } = require('../middlewares/validateJWT');
const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events')
const { check } = require('express-validator');
const { validateField } = require('../middlewares/fieldValidator');
const { isDate } = require("../helpers/isDate");


const router = Router();


// Get events 

router.get('/',
        validateJWT,
        getEvent
        );

// Create new events

router.post('/', 
        [check('title', 'You have to enter a title').not().isEmpty(),
        check('start', 'You have to enter a start date').custom(isDate),
        validateField, 
        validateJWT], 
        createEvent
        );

// Update event

router.put('/:id', [validateJWT], updateEvent);

// Delete event

router.delete('/:id', [validateJWT], deleteEvent);



module.exports = router;