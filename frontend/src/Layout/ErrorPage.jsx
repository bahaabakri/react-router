import classes from './ErrorPage.module.css'
import { Link } from 'react-router-dom'
import { useRouteError } from 'react-router-dom'
import MainNavigation from './MainNavigation'
import PageContent from '../components/PageContent'
const ErrorPage = () => {
    const error = useRouteError()
    let message, title
    message = 'Something went wrong'
    title = 'An error occured'
    if(error?.status?.toString().startsWith('5')) {
        // message = error?.message ?? 'Something went wrong'
        message = error.data.message
    }
    if (error.status === 404) {
            message = 'Sorry, we could not reach this page, maybe this page has been deleted or moved'
            title = 'Page Not Found'
    }
    return (
        <>
        <MainNavigation />
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
        </>
    )
}

export default ErrorPage