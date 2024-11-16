import {redirect } from "react-router"
import EventItem from '../components/EventItem'
import { json, useRouteLoaderData } from 'react-router-dom'
const EventDetails = () => {
    const data = useRouteLoaderData('event-details')
    return (
            <EventItem event={data.event}></EventItem>
    )
}
export default EventDetails

export async function eventDetailsLoader({request, params}) {
    const eventId = params.eventId
    const response = await fetch(`http://localhost:8080/events/${eventId}`)
    if(!response.ok) {
        throw json({message: 'Faild to load data'}, {status: 500})
    } else {
        return response
    }

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