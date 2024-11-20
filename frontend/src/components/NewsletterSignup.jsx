import { useEffect } from 'react';
import classes from './NewsletterSignup.module.css';
import {useFetcher} from 'react-router-dom'
function NewsletterSignup() {
    const {data, state, Form} = useFetcher()

    useEffect(() => {
        if(state === 'idle' && data && data.message) {
            window.alert(data.message)
        }
    }, [data, state])
  return (
    <Form method="post" action='/newsletter' className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </Form>
  );
}

export default NewsletterSignup;