import {useRouteLoaderData} from "react-router-dom"
import EventForm from '../components/EventForm'
const EditEvent = () => {
    const data = useRouteLoaderData('event-details')
    return <div>
        <EventForm event={data.event} method={'PATCH'}></EventForm>
    </div>
}
export default EditEvent