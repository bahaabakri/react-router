import { Suspense } from 'react';
import EventsList from '../components/EventsList';
import { Await, defer, json, useLoaderData } from 'react-router';

function EventsPage() {

const {events} = useLoaderData()

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

export async function eventsLoaderFetch() {
    const response = await fetch('http://localhost:8080/events');
        
    if (!response.ok) {
    throw json({message: 'Faild to load data'}, {status: 500})
    } else {
      const responseData = await response.json()
      return responseData.events
    }
}

export function eventsLoader() {
  return defer({
    events: eventsLoaderFetch()
  })
}