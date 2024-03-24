import { BrowserRouter, Route,  Routes } from 'react-router-dom';

import About from './Client/LandingPage/body/AboutUs';
import SignUp from './Client/LandingPage/body/SignUp';
import SignIn from './Client/LandingPage/body/SignIn';
import Layout from './Client/LandingPage/Layout/Layout';
import Landing from './Client/LandingPage/body/Landing';

import ClientHomePage from './Client/Dashboard/clientHomePage';
import DashLayout from './Client/Dashboard/layout/DashboardLayout';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Landing />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/home" element={<Landing />} />
                    <Route path="/services" element={<Landing />} />
                </Route>
                
                <Route path="/dashboard" element={<DashLayout />}>
                    <Route index element={<ClientHomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App; // Make the component accessible to other files
