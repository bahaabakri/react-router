import { useParams } from "react-router"
import {useRouteLoaderData} from "react-router-dom"
import EventForm from '../components/EventForm'
const EditEvent = () => {
    const data = useRouteLoaderData('event-details')
    return <div>
        <EventForm event={data.event}></EventForm>
    </div>
}
export default EditEvent