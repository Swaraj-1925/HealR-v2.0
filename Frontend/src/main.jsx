import ReactDOM from 'react-dom/client'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Client/LandingPage/Layout/Layout.jsx';
import Landing from './Client/LandingPage/body/Landing.jsx';
import About from './Client/LandingPage/body/AboutUs.jsx';
import SignUp from './Client/LandingPage/body/SignUp.jsx';
import SignIn from './Client/LandingPage/body/SignIn.jsx';


const router = createBrowserRouter(
  createRoutesFromElements([
    // eslint-disable-next-line react/jsx-key
    <Route path='/' element={<Layout />}>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Landing />} />
      <Route path="/services" element={<Landing />} />
      <Route path="/contact" element={<Landing />} />
      <Route path='/about-us' element={<About />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/sign-in' element={<SignIn />} />
    </Route>
  ])
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
