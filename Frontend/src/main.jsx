import ReactDOM from 'react-dom/client'
 
import {   Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Client/LandingPage/Layout/Layout.jsx';
import Landing from './Client/LandingPage/body/Landing.jsx';
import About from './Client/LandingPage/body/AboutUs.jsx';


const router = createBrowserRouter(
  createRoutesFromElements([
  // eslint-disable-next-line react/jsx-key
  <Route path='/' element={<Layout />}>
    <Route path='' element={<Landing />}/>
    <Route path='about_Us' element={<About />}/>
  </Route>
  ])
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
