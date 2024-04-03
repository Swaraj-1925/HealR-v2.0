import { Outlet } from 'react-router-dom';
import Footer from './doc-footer';
import Header from './doc-header';



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