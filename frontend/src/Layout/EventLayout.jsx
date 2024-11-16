import { Outlet } from "react-router"
import EventNavigation from './EventsNavigation'
const EventLayout = () => {
    return <>
        <EventNavigation />
        <Outlet />
    </>
}

export default EventLayout