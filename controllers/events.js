const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();

        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.createEvent = async (req, res) => {
    const { title, date } = req.body;

    const newEvent = new Event({ title, date })

    try {
        await newEvent.save();
        res.status(201).json(
            {
                type: "success",
                message: "Event has been added successfully"
            }
        );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    await Event.findByIdAndRemove(id);

    res.json({ message: "Event deleted successfully." });
}


