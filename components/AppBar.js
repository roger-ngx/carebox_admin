import { useAuth } from "../firebase/authContext";


const AppBar = () => {

    const { authUser } = useAuth();
    console.log('authUser', authUser);

    return (
        <div style={{width: '100wh', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#E3F4FF'}}>
            <span style={{fontSize: 18}}><span style={{color: '#009DFF', fontWeight: 'bold', fontSize: 18}}>케어박스</span> 관리자 센터</span>
            <div style={{display: 'flex', flexDirection: 'row', lignItems: 'center'}}>
                <div style={{marginRight: 16}}>
                    <span>{authUser && authUser.displayName}</span>
                </div>
                <div style={{marginRight: 16}}>
                    <span>알림</span>
                </div>
                <div>
                    <span>로그아웃</span>
                </div>
            </div>
        </div>
    )
}

export default AppBar;