import React from "react";
import Footer from "../components/Footer"//sin el ../ no lo encuentra
import NavbarPerfil from "../components/NavbarPerfil";
import EditarPerfil from "../components/EditarPerfil";



export default function P_Perfil() {
    return (
    <div>
        <NavbarPerfil />
        <EditarPerfil/>
        <Footer />
    </div>
    );
  }