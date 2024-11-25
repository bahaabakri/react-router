// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components


import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import EventsPage, {eventsLoader} from './pages/Events'
import EventDetails, {eventDetailsLoader, deleteEventAction} from './pages/EventDetails';
import NewEvent from './pages/NewEvent';
import {addEditEventAction} from './components/EventForm'
import EditEvent from './pages/EditEvent';
import MainLayout from './Layout/MainLayout'
import ErrorPage from './Layout/ErrorPage'
import EventLayout from './Layout/EventLayout'
import NewsletterPage, {action as newsletterAction} from './pages/Newsletter'
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'events',
          element: <EventLayout />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: eventsLoader
            },
            {
              path: ':eventId',
              id: 'event-details',
              loader: eventDetailsLoader,
              children: [
                {
                  index: true,
                  action: deleteEventAction,
                  element: <EventDetails />,
                },
                {
                  path: 'edit',
                  action: addEditEventAction,
                  element: <EditEvent />,
                }
              ]
            },
            {
              path: 'new',
              action: addEditEventAction,
              element: <NewEvent/>
            }
          ]
        },
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App;
