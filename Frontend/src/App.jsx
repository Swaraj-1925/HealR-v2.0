import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './Client/LandingPage/Layout/Layout';
import About from './Client/LandingPage/body/AboutUs';
import Landing from './Client/LandingPage/body/Landing';
import SignIn from './Client/LandingPage/body/SignIn';
import SignUp from './Client/LandingPage/body/SignUp';

import BookAppointment from './Client/Dashboard/clientBookAppointment';
import DoctorDescription from './Client/Dashboard/clientDoctorDescription';
import ClientHomePage from './Client/Dashboard/clientHomePage';
import DashLayout from './Client/Dashboard/layout/DashboardLayout';

import Doc_layout from './Doctor/LandingPage/Layout/doc-layout';
import Doc_landingPage from './Doctor/LandingPage/body/doc_landingPage';
import Doc_signUp from './Doctor/LandingPage/Layout/doc-signup';
import Doc_signIn from './Doctor/LandingPage/Layout/doc-signin';


import Doc_home_layout from './Doctor/Dashboard/layout/layout.jsx';
import Doc_home from './Doctor/Dashboard/doc-home.jsx';

import AdminSignIN from './admin/admin-signIn.jsx';
import AdminDashboard from './admin/admin-dashboard.jsx';
import AdminLayout from './admin/componets/admin-layout.jsx';
import AdminDoctor from './admin/admin-doctor.jsx';
import AdminPatient from './admin/admin-Patient.jsx';
import AdminStaff from './admin/admin-staff.jsx';

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
                    <Route path="/dashboard/book-appoinmet" element={<BookAppointment />} />
                    <Route path="/dashboard/doctordes" element={<DoctorDescription />} />
                </Route>


                <Route path="/doctor" element={<Doc_layout />}>
                    <Route index element={<Doc_landingPage />} />
                    <Route path='doc-signup' element={<Doc_signUp />} />
                    <Route path='doc-signin' element={<Doc_signIn />} />
                    <Route path="#doc-home" element={<Doc_landingPage />} />
                    <Route path="home" element={<Doc_home />} />
                </Route>

                <Route path="/doc" element={<Doc_home_layout />}>
                    <Route index element={<Doc_home />} />
                    
                    
                </Route>

                    <Route path='/admin' element={<AdminSignIN />} />   
                <Route path="/admin"element={<AdminLayout />}>
                    <Route path="admin_dashboard" element={<AdminDashboard />} />  
                    <Route path="admin_doctor" element={<AdminDoctor />} />  
                    <Route path="admin_patient" element={<AdminPatient />} />  
                    <Route path="admin_staff" element={<AdminStaff />} />  
                </Route>


            </Routes>
        </BrowserRouter>
    );
};

export default App;
