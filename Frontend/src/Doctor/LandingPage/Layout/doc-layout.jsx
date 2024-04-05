import { Outlet } from 'react-router-dom';
import Header from './doc-header';
import Footer from './../../../Client/LandingPage/Layout/Footer.jsx';



function doc_layout() {
    return ( 
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
     );
}

export default doc_layout;