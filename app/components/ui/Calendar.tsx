import { useState, useEffect } from 'react';


const Calendar = () => {



    interface DateRange {
        start: string | Date;
        end: string | Date;
    }

    interface EventProps {
        title: string;
        desc: string;
        start: string;
        end: string;
        id: number;
        dateCreated: string;
        dateModified: string;
    }

    interface ActiveMonth {
        monthStartWeekDay: number;
        lastDay: number;
        month: string | number | Date;
        year: string | number | Date;
    }

    const [events, setEvents] = useState<EventProps[]>([]);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventEnd, setEventEnd] = useState('');
    const [formVisibility, setFormVisibility] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange>({
        start: new Date(),
        end: new Date()
    });
    const [dateObj, setDateObj] = useState<ActiveMonth>({
        monthStartWeekDay: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay(),
        lastDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
        month: new Date().toLocaleString('en-US', { month: 'long' }),
        year: new Date().getFullYear()
    });

    useEffect(() => {
        let date = new Date();
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        let weekdayCounter = dateObj.monthStartWeekDay;
        let weekCounter = 0;
        let monthCounter = 1;
        let calendarArray: number[][] = [
            [], [], [], [], [], [],
        ];

        while (monthCounter <= dateObj.lastDay) {
            while (weekdayCounter < 7 && monthCounter <= dateObj.lastDay) {
                calendarArray[weekCounter][weekdayCounter] = monthCounter;
                if (weekdayCounter === 6) {
                    weekdayCounter = 0;
                    weekCounter++;
                } else {
                    weekdayCounter += 1;
                }
                monthCounter++;
            }
        }

        console.log(calendarArray);

    }, []);

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

    }

    /**
     * keep track of just the current date, and have
     * 1. We can keep track of the current month, 
     * current day, and current year. Or, we could 
     * it highlighted on the calendar. We can call it
     * `activeDate`, and calculate the value of which
     * cell should be active based on the calculation
     * from the current date.
     * with all the weekdays, starting on Sunday.
     * 2. We'll have the same standard header row,
     * 3. We'll have toggle buttons that will either
     * increment or decrement the month. 
     **/

    return (
        <>
            <div>
                <div>
                    <h3>{`${dateObj.month} ${dateObj.year}`}</h3>
                    <button></button>
                    <button></button>
                </div>
                <div className='flex flex-row justify-evenly'>
                    <div>S</div>
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                </div>

            </div>
        </>
    );


}

export default Calendar;