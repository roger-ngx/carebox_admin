import Link from 'next/link'
import { withRouter } from 'next/router'

const AppDrawer = ({router}) => {

    const { pathname } = router;
    console.log(pathname);

    return (
        <div style={{width: 250, height: 'calc(100vh - 65px)', borderRightWidth: 1, borderRightStyle: 'solid', borderRightColor: '#E5E5E5'}}>
            <div style={{display: 'flex', flexDirection: 'column', padding: 20, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#E5E5E5'}}>
                <span style={{fontSize: 9, fontWeight: 'bold', color: '#AFAFAF'}}>회원 관리</span>
                <div style={{marginTop: 16}}>
                    <Link href='/users'>
                        <a style={{fontWeight: 'bold', color: pathname==='/users' ? '#009DFF' : '#000'}}>회원 리스트</a>
                    </Link>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', padding: 20, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#E5E5E5'}}>
                <span style={{fontSize: 9, fontWeight: 'bold', color: '#AFAFAF'}}>아이디어 관리</span>
                <div style={{marginTop: 16}}>
                    <Link href='/ideas'>
                        <a style={{fontWeight: 'bold', color: pathname==='/ideas' ? '#009DFF' : '#000'}}>아이디어 리스트</a>
                    </Link>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', padding: 20}}>
                <Link href='/notifications'>
                    <a style={{fontWeight: 'bold', color: pathname==='/notifications' ? '#009DFF' : '#000'}}>공지 리스트</a>
                </Link>
            </div>
        </div>
    )
}

export default withRouter(AppDrawer);