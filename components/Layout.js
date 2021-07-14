import AppBar from "./AppBar"
import AppDrawer from "./AppDrawer"

const Layout = ({children}) => {

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <AppBar />
            <div style={{display: 'flex', flexDirection: 'row', flex: 1}}>
                <AppDrawer />
                {children}
            </div>
        </div>
    )
}

export default Layout;