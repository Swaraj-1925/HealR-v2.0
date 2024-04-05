import { Outlet } from 'react-router-dom';
import Header from '../admin-header.jsx';

function AdminLayout() {
    return (  
        <>
        <Header />
        <Outlet />
         
        </>
    );
}

export default AdminLayout;