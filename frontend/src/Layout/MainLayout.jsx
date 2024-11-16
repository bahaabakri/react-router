import { Outlet, useNavigation } from "react-router"
import MainNavigation from "./MainNavigation"

const MainLayout = () => {
    const navigation = useNavigation();
    return <>
        <MainNavigation />
        {navigation.state === 'loading'
            ? <p style={{'text-align': 'center'}}> Loading ... </p>
            : <Outlet />
        }
        
    </>
}

export default MainLayout