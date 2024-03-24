
import DashHeader from './DashboardHeader.jsx';
import { Outlet } from "react-router-dom"

function DashLayout() {
    return ( 
        <>
            <DashHeader />
            <Outlet />
           
        </>
     );
}

export
 default DashLayout;