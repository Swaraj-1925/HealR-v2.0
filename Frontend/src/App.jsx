import { BrowserRouter, Route, Routes } from 'react-router-dom';

import About from './Client/LandingPage/body/AboutUs';
import SignUp from './Client/LandingPage/body/SignUp';
import SignIn from './Client/LandingPage/body/SignIn';
import Layout from './Client/LandingPage/Layout/Layout';
import Landing from './Client/LandingPage/body/Landing';

import ClientHomePage from './Client/Dashboard/clientHomePage';
import DashLayout from './Client/Dashboard/layout/DashboardLayout';
import BookAppointment from './Client/Dashboard/clientBookAppointment';
import DoctorDescription from './Client/Dashboard/clientDoctorDescription';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Landing Page Routes */}
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
                    <Route path="/dashboard/book-appoinmet" element={<BookAppointment />} />
                    <Route path="/dashboard/doctordes" element={<DoctorDescription />} /> 
                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
