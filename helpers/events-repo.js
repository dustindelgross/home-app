const fs = require('fs');

// events in JSON file for simplicity, store in a db for production applications
let events = require('data/events.json');

export const eventsRepo = {
    getAll: () => events,
    getById: id => events.find(x => x.id.toString() === id.toString()),
    find: x => events.find(x),
    today,
    create,
    update,
    delete: _delete
};

function create(event) {
    // generate new event id
    event.id = events.length ? Math.max(...events.map(x => x.id)) + 1 : 1;

    // set date created and updated
    event.dateCreated = new Date().toISOString();
    event.dateUpdated = new Date().toISOString();
    

    // add and save event
    events.push(event);
    saveData();
}

function update(id, params) {
    const event = events.find(x => x.id.toString() === id.toString());

    // set date updated
    event.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(event, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted event and save
    events = events.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/events.json', JSON.stringify(events, null, 4));
}

function today() {

    const today = new Date().getTime(); // Get the current date in ISO format (YYYY-MM-DD)

    return events.filter((event) => {
        const eventStart = new Date(event.start).getTime(); // Extract the date from the ISO start time
        const eventEnd = new Date(event.end).getTime();
        return (eventEnd >= today) && (today >= eventStart);
    });
}