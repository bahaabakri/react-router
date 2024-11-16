import EventsList from '../components/EventsList';
import { json, useLoaderData } from 'react-router';

function EventsPage() {

const data = useLoaderData()
// if (data.isError) {
//     return <p>{data.errorMessage}</p>
// }
  return (
    <>
      <EventsList events={data.events} />
    </>
  );
}

export default EventsPage;

export async function eventsLoader() {
    const response = await fetch('http://localhost:8080/events');
        
    if (!response.ok) {
    //   return {
    //     isError: true,
    //     errorMessage: 'Something went wrong'
    //   }
    // throw new Response(JSON.stringify({message: 'Faild to load data'}), {status: 500})
    // const error = new Error('Faild to load data')
    // error.status = 500
    // throw error
    throw json({message: 'Faild to load data'}, {status: 500})
    } else {
      return response
    }
}