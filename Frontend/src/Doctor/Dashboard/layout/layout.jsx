import { Outlet } from 'react-router-dom';
import Header from './header.jsx';

function docHomeLayout() {
    return ( 
        <>
         <Header />
        <Outlet />
        
        </>
     );
}

export default docHomeLayout;