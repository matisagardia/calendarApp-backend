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


const updateEvent = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateEvent'
    })
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