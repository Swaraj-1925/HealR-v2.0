import { BrowserRouter, Route, Routes } from 'react-router-dom';

import About from './Client/LandingPage/body/AboutUs.jsx';
import SignUp from './Client/LandingPage/body/SignUp.jsx';
import SignIn from './Client/LandingPage/body/SignIn.jsx';
import Layout from './Client/LandingPage/Layout/Layout.jsx';
import Landing from './Client/LandingPage/body/Landing.jsx';
import ClientHomePage from './Client/HomePage/clientHomePage';

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
                <Route path="/dashboard" element={<ClientHomePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App; // Make the component accessible to other files
