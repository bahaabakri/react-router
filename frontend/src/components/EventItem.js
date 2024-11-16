import { Link, useNavigation, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {
  const submit = useSubmit()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting' ? true : false
  function startDeleteHandler(e) {
    if (e) {
      e.preventDefault()
    }
    const confirmDelete = window.confirm("Are u sure want to delete this event?")
    if(confirmDelete) {
      // delete event
      submit(null, {
        method: 'DELETE'
      })
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to='edit'>Edit</Link>
        <button 
          disabled={isSubmitting}
          onClick={startDeleteHandler} 
          onSubmit={(e) => startDeleteHandler}>
          {isSubmitting ? 'Deleting ...' : 'Delete'}
        </button>
      </menu>
    </article>
  );
}

export default EventItem;
