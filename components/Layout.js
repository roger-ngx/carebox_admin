import AppBar from "./AppBar"
import AppDrawer from "./AppDrawer"

const Layout = ({children}) => {

    return (
        <div>
            <AppBar />
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <AppDrawer />
                {children}
            </div>
        </div>
    )
}

export default Layout;