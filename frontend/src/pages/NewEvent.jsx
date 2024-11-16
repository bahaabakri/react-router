
import {json, redirect} from 'react-router-dom'
import EventForm from '../components/EventForm'
const NewEvent = () => {
    return <EventForm method='POST' />
}

export default NewEvent