import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { imageZoomEffect, TitleStyles } from "./ReusableStyles";
import { Autocomplete, TextField, Paper, Grid, Stack, flex } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
 import { Button, Box, Typography } from '@mui/material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Rating from '@mui/material/Rating';
import FilterListIcon from '@mui/icons-material/FilterList';

import { buscarReceta } from "../controllers/recetaController";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#7c496acc",
        padding: "10px 80px",
    },
}));

export default function RecetasListadoFiltrosUSR() {

    const topCategorias = [
        { title: 'Postres' },
        { title: 'Carnes' },
        { title: 'Frituras' },
        { title: 'Pasteleria' },
        { title: 'Guisos y sopas' },
        { title: 'Arroces y pastas' },
        { title: 'Pizzas' },
        { title: 'Panes' },
        { title: 'Vegetarianas' },
    ];

    const topDificultades = [
        { title: '1' },
        { title: '2' },
        { title: '3' },
        { title: '4' },
        { title: '5' },
    ];

    const classes = useStyles();
    const [listaRecetas, setListaRecetas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dificultad, setDificultad] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [page, setPage] = useState(1);
    const [pageCount, setpageCount] = useState(0);
    const myRef = useRef(null);
    const executeScroll = () => scrollToRef(myRef);

    useEffect(() => {
    });


    async function mostrar() {
        let rdo = await buscarReceta(nombre, categoria, dificultad, ingredientes);
        setListaRecetas(rdo.data);

    }

    async function limpiar() {
        document.getElementById("nombre").value = "";
        setNombre('');
        document.getElementById("categoria").value = "";
        setCategoria('');
        document.getElementById("dificultad").value = "";
        setDificultad('');
        document.getElementById("ingrediente").value = "";
        setIngredientes('');
        let rdo = await buscarReceta('', '', '', '', page);
        setListaRecetas(rdo.data);
    }

    window.onload = function () {
        mostrar();
    }

    const setearNombre = e => {
        const nombre = e.target.value;
        console.log("nombre seteado", nombre);
        setNombre(nombre);
    };

    const setearIngredientes = e => {
        const ingredientes = e.target.value;
        console.log("ingredientes seteada", ingredientes);
        setIngredientes(ingredientes);
    };

    const setearCategoria = e => {
        const categoria = e;
        console.log("categoria seteada", categoria);
        setCategoria(categoria);
    };


    const setearDificultad = e => {
        const dificultad = e;
        console.log("dificultad seteada", dificultad);
        setDificultad(dificultad);

    };

    // function handleAnterior() {
    //     setPage((p) => {
    //         if (p === 1)
    //             return p
    //         else
    //             return p - 1
    //     })
    // }

    // function handleSiguiente() {
    //     setPage((p) => {
    //         if (p === pageCount)
    //             return p
    //         else {
    //             return (p + 1)
    //         }
    //     })
    // }

    return (
        <Section id="recetas">

            <div className="title">
                <h1>
                    <span>Buscador</span>
                </h1>
            </div>

            <div className="filtros">
                <Grid container direction="row">
                    <Grid item xs={12} md={2}>
                        <TextField id="nombre" label="Nombre" color="secondary" size="small" fullWidth onChange={setearNombre} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Autocomplete
                            onChange={(event, categoria) => setearCategoria(categoria)}
                            id="categoria"
                            label="Categoria"
                            size="small"
                            Categoría
                            options={topCategorias.map((option) => option.title)}
                            renderInput={(params) => <TextField {...params} label="Categoria" color="secondary" />}

                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Autocomplete
                            onChange={(event, dificultad) => setearDificultad(dificultad)}
                            id="dificultad"
                            label="Dificultad"
                            size="small"
                            Dificultad
                            options={topDificultades.map((option) => option.title)}
                            renderInput={(params) => <TextField {...params} label="Dificultad" color="secondary" />}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField id="ingrediente" label="Ingrediente" color="secondary" size="small" fullWidth onChange={setearIngredientes} />
                    </Grid>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={mostrar}
                        endIcon={<FilterListIcon />}>
                        Aplicar Filtros
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={limpiar}
                        endIcon={<FilterListIcon />}>
                        Quitar Filtros
                    </Button>
                </Grid >
            </div >

            <div className="products">
                {listaRecetas.map((receta) => {
                    return (
                        <div className="id" key={receta._id}>
                            <div className="product">
                                <div className="image">
                                    <img src={receta.nombreImagen} alt="" />
                                </div>
                                {/* <>{receta._id}</> */}
                                <Typography
                                    sx={{ textAlign: "center", fontWeight: 'bold' }}
                                    variant="overline"
                                >
                                    {receta.nombre}
                                </Typography>
                                <Rating defaultValue={receta.calificacionPromedio} precision={1} readOnly sx={{ fontSize: 50 }} />
                                <NavLink to={`/login/receta/${receta._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                    <button>Ver más</button>
                                </NavLink>

                            </div>
                        </div>
                    );
                })}
            </div>


        </Section >

    );
}

const Section = styled.section`
  ${TitleStyles};
  .products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    margin-top: 6rem;
    .product {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      justify-content: center;
      align-items: center;
      h3 {
        color: #44214e;
      }
      ${imageZoomEffect};
      .image {
        max-height: 20rem;
        overflow: hidden;
        border-radius: 1rem;
        img {
          height: 20rem;
          width: 15rem;
          object-fit: cover;
        }
      }
      button {
        border: none;
        padding: 1rem 4rem;
        font-size: 1.4rem;
        color: white;
        border-radius: 4rem;
        transition: 0.5s ease-in-out;
        cursor: pointer;
        background: linear-gradient(to right, #572e57, #834e6d, #572e57);
        text-transform: uppercase;
        &:hover {
          background: linear-gradient(to right, #572e57, #834e6d, #572e57);
        }
      }      
    }

  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    .products {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;