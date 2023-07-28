import { eventsRepo } from 'helpers/events-repo';

export default function handler(req, res) {
 
    let event = req.body;
    event.title = event.title ? event.title : 'New Event';
    event.desc = event.desc ? event.desc : '';
    event.start = event.start ? event.start : '';
    event.end = event.end ? event.end : '';

    eventsRepo.create(event);

    return res.status(200).json({});
}