import { useNavigate, Form, useNavigation, useActionData, redirect, json } from 'react-router-dom';
import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation()
  const errorResponseData = useActionData()
  const isSubmitting = navigation.state === 'submitting' ? true : false
  function cancelHandler() {
    navigate('..');
  }

  return (

    <Form className={classes.form} method={method}>
      {(errorResponseData && errorResponseData.errors) && 
        <ul>
          {
            Object.values(errorResponseData.errors).map(err => <li key={err}>{err}</li>)
          }
        </ul>
      }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
        {!isSubmitting ? 'Save' : 'Submitting ...' }
        </button>
      </div>
    </Form>
  );
}

export default EventForm;
export async function addEditEventAction({request, params}) {
  let url = 'http://localhost:8080/events/'
  if (request.method === 'PATCH') {
      url += params.eventId
  }
  let formData = await request.formData()
  const dataToSend = {
      title: formData.get('title'),
      description: formData.get('description'),
      date: formData.get('date'),
      image: formData.get('image')
  }
  const response = await fetch(url, {
      method: request.method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
  })
  if (response.status === 422) {
      return response
  }
  if(!response.ok) {
      throw json({message: 'Faild to load data'}, {status: 500})
  }
  return redirect('/events')
}
