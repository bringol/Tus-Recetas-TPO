import React from "react";
import Footer from "../components/Footer"//sin el ../ no lo encuentra
import NavbarVacioUSR from "../components/NavbarVacioUSR";
import ScrollToTop from "../components/ScrollToTop";
//import Login from "../components/InicioSesion"

//
import PublicarReceta from "../components/PublicarReceta";
// import Filtros from "../components/Filtros"
// import CuadroTexto from "../components/CuadroTexto";
// import Newsletter from "../components/Mis_Recetas";


export default function P_Perfil() {
    return (
    <div>
        <ScrollToTop />
        <NavbarVacioUSR />
        <PublicarReceta/>
        <Footer />
    </div>
    );
  }