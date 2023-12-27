import { createBrowserRouter } from "react-router-dom";
import Home from '/src/pages/Home'; 
import Portfolio from '../pages/Portfolio'
import Error404 from "../pages/Error404";
import { LayoutPublic } from "../layout/LayoutPublic";
import Planes from "../pages/Planes";
import Contact from "../pages/Contact";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublic />,
    errorElement: <Error404/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "/portfolio",
        element: <Portfolio/>,
      },
      {
        path: "/planes",
        element: <Planes/>,
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
    ]
},


])