const express = require('express');
const Event = require('../models/Event');

const getEvent =  async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    })
}

const createEvent = async (req, res = response) => {
    
    // create a new Event instance from event.js on models

    const event = new Event(req.body);

    try {

        event.user = req.uid;

       const savedEvent = await event.save();

        res.json({
            ok: true,
            event: savedEvent
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact support'
        })
    }
}


const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        // check if event exists

        const event = await Event.findById(eventId);

        // if it doens't, return an error

        if ( !event ) {
            res.status(404).json({
                ok: false,
                msg: 'Event does not exists with that ID'
            });
        }

        // check if the person that created the event matches with the one that is modifying

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not allowed to edit this event'
            })
        }

        // if reaches this point, it is OK and the person can edit the event

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.json({
            ok: true,
            event: updatedEvent
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact support'
        });
    }

}

const deleteEvent = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteEvent'
    })
}


module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}