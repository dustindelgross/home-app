import { useState, useEffect } from "react";

import { motion, AnimatePresence } from 'framer-motion';
import { SubmitButton, TextInput, TextArea, DateTimeLocal } from './Inputs';

export default function EventsList() {
    interface EventProps {
        title: string;
        desc: string;
        start: string;
        end: string;
        id: number;
        dateCreated: string;
        dateModified: string;
    }

    const [events, setEvents] = useState<EventProps[]>([]);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventEnd, setEventEnd] = useState('');
    const [formVisibility, setFormVisibility] = useState(false);

    async function listEvents() {
        let response = await fetch('/api/events/get', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                all: true
            })
        });

        let json = await response.json();

        setEvents(json);

    }

    async function getToday() {

        let response = await fetch('/api/events/get', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                today: true
            })
        });

        let json: EventProps[] = await response.json();
        json.sort((a, b) => {

            const dateA = new Date(a.start);
            const dateB = new Date(b.start);
            return dateA.getTime() - dateB.getTime();
        });
        setEvents(json);

    }

    async function newEvent() {

        let response = await fetch('/api/events/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: eventTitle,
                desc: eventDesc,
                start: new Date(eventStart).toISOString(),
                end: new Date(eventEnd).toISOString()
            })

        });

        setEventTitle('')
        setEventDesc('')
        setEventStart('')
        setEventEnd('')

        console.log(response);

    }

    useEffect(() => {
        getToday();
    }, []);



    return (
        <>
            <div>
                <h1 className='text-xl my-lg'>Today's Happenings!</h1>
                <div className="relative w-full my-3">
                    <AnimatePresence>
                        <motion.button
                            className={` px-2 right-0 text-sm bg-blue-600 flex justify-center items-center hover:bg-grey-600 rounded-md transition-colors relative`}
                            onClick={() => setFormVisibility(!formVisibility)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={`${formVisibility ? 'rotate-45' : ''} transition duration-300 ease-in-out block relative z-10`}>+</span>
                        </motion.button>
                    </AnimatePresence>
                </div>
                <AnimatePresence>
                    {formVisibility &&
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 100
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                y: 100
                            }}
                        >
                            <form

                                className='flex flex-col gap-4 max-w-md'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    newEvent();
                                    getToday();
                                }}
                            >
                                <TextInput
                                    id='event_title'
                                    label='Event Title'
                                    placeholder='Party Time!'
                                    value={eventTitle}
                                    onChange={val => setEventTitle(val)}
                                />
                                <TextArea
                                    id='event_desc'
                                    label='Event Description'
                                    value={eventDesc}
                                    onChange={val => setEventDesc(val)}
                                />
                                <DateTimeLocal
                                    id='event_start'
                                    label='Event Start Date'
                                    value={eventStart}
                                    onChange={val => setEventStart(val)}
                                />
                                <DateTimeLocal
                                    id='event_end'
                                    label='Event End Date'
                                    value={eventEnd}
                                    onChange={val => setEventEnd(val)}
                                />
                                <SubmitButton text={`Create`} />
                            </form>
                        </motion.div>
                    }
                </AnimatePresence>
                <div className='flex flex-col gap-4'>
                    <AnimatePresence>
                        {!formVisibility && events &&
                            events.map((event) => {

                                const today = new Date();
                                const startDate = new Date(event.start);
                                const endDate = new Date(event.end);
                                let ongoing = today.getDate() > startDate.getDate();

                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 100 }}
                                        key={event.id}
                                        className='flex flex-col flex-wrap border rounded border-grey-600 shadow-lg bg-grey-950/20 p-3'
                                    >
                                        <div className="grow">
                                            {ongoing ?
                                                <p className='flex gap-3 text-xs items-center'>
                                                    <span className="bg-rose-600 px-2 py-1 inline-block text-xs text-grey-200 rounded-xl">Ongoing</span>
                                                    Ends on {endDate.toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
                                                : <p className="text-xs">Today at {new Date(event.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                            }
                                            <p className="mt-1">{event.title}</p>
                                        </div>
                                        <div className="grow mt-2">
                                            {event.desc && <p className='text-xs'>{event.desc}</p>}
                                        </div>
                                    </motion.div>)
                            })
                        }
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}