import {useParams } from "react-router"
import EventItem from '../components/EventItem'
import { Link, json, useRouteLoaderData } from 'react-router-dom'
const EventDetails = () => {
    const params = useParams()
    const data = useRouteLoaderData('event-details')
    const id = params.id
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