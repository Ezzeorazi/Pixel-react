import { createBrowserRouter } from "react-router-dom";
import Home from "/src/pages/Home";
import Portfolio from "../pages/Portfolio";
import { LayoutPublic } from "../layout/LayoutPublic";
import Planes from "../pages/Planes";
import Contact from "../pages/Contact";
import { LayoutPublicEn } from "../english/layout/LayoutPublicEn";
import HomeEn from "../english/pages/HomeEn";
import PortfolioEn from "../english/pages/PortfolioEn";
import PlanesEn from "../english/pages/PlanesEn";
import ContactEn from "../english/pages/ContactEn";
import Error404 from '../pages/Error404'

export const router = createBrowserRouter([
  // Rutas para el idioma inglés
  {
    path: "/en",
    element: <LayoutPublicEn />,
    children: [
      {
        index: true,
        element: <HomeEn />,
      },
      {
        path: "portfolioen",
        element: <PortfolioEn />,
      },
      {
        path: "planesen",
        element: <PlanesEn />,
      },
      {
        path: "contacten",
        element: <ContactEn />,
      },
    ],
  },
  // Rutas para el idioma español (predeterminado)
  {
    path: "/",
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "planes",
        element: <Planes />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  // Ruta de captura para cualquier otra URL
  {
    path: "*",
    element: <Error404 />,
  },
]);
