import {defer, redirect, Await } from "react-router"
import EventItem from '../components/EventItem'
import { json, useRouteLoaderData } from 'react-router-dom'
import {eventsLoaderFetch} from './Events'
import { Suspense } from "react"
import EventsList from "../components/EventsList"
const EventDetails = () => {
    const {event, events} = useRouteLoaderData('event-details')
    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading ...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent}></EventItem>}
                </Await>
            </Suspense>

            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading ...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
            
    )
}
export default EventDetails

export async function eventDetailsLoaderFetch(eventId) {
    // const eventId = params.eventId
    const response = await fetch(`http://localhost:8080/events/${eventId}`)
    if(!response.ok) {
        throw json({message: 'Faild to load data'}, {status: 500})
    } else {
        const responseData = await response.json()
        return responseData.event
    }

}

export async function eventDetailsLoader({request, params}) {
    const eventId = params.eventId
    return defer({
        events: eventsLoaderFetch(),
        event: await eventDetailsLoaderFetch(eventId) // defer wait until load the event details
    })
}

export async function deleteEventAction({request, params}) {
    const eventId = params.eventId
    const response = await fetch(`http://localhost:8080/events/${eventId}`, {
        method: request.method
    })
    if(!response.ok) {
        throw json({message: 'Faild to load data'}, {status: 500})
    } else {
       return redirect('/events')
    }

}