import { eventsRepo } from 'helpers/events-repo';

export default function handler(req, res) {
 
    let event = req.body;

    if ( event.id ) {
        event = eventsRepo.getById(event.id);
    }
    
    if( event.all ) {
        event = eventsRepo.getAll();
    }

    if( event.today ) {
        event = eventsRepo.today();

    }
    return res.status(200).json(event); 

    
}