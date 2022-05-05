import React from "react";
import { Autocomplete, TextField, Paper, Grid, Stack } from "@mui/material";
import styled from "styled-components";
import { TitleStyles } from "./ReusableStyles";


export default function Search() {

  const paperStyle = { padding: 20, height: '32vh', width: 280, margin: '20px auto' }

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
    { title: 'Baja' },
    { title: 'Media' },
    { title: 'Alta' },
  ];

  const topIngredientes = [
    { title: 'Verduras' },
    { title: 'Carne' },
    { title: 'Pescado' },
    { title: 'Pollo' },
    { title: 'Frutas' },
  ];

  const topCalificaciones = [
    { title: '1 estrella' },
    { title: '2 estrellas' },
    { title: '3 estrellas' },
    { title: '4 estrellas' },
    { title: '5 estrellas' },
  ];

  return (
    <Section id="busqueda">
      <div className="title">
        <h1>
          <span>BUSCAR RECETAS</span>
        </h1>
      </div>

      <div>
        <div className="container">
          <input type="text" placeholder="Buscar recetas" />
          <button>Buscar</button>
        </div>
      </div>

      <div className="filtros">
        <Grid container direction="row">
          <Grid item xs={12} md={3}>
            <Autocomplete
              id="categorias"
              size="small"
              Categorías
              options={topCategorias.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="Categorias" color="secondary" />}
            />
          </Grid>
          <Grid  item xs={12} md={3}>
            <Autocomplete
              id="dificultad"
              size="small"
              Dificultad
              options={topDificultades.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="Dificultad" color="secondary" />}
            />
          </Grid>
          <Grid  item xs={12} md={3}>
            <Autocomplete
              id="ingtedientes"
              size="small"
              Ingredientes
              color="secondary" 
              options={topIngredientes.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="Ingredientes"  color="secondary"/>}
            />
          </Grid>
          <Grid  item xs={12} md={3}>
            <Autocomplete
              id="calificacion"
              size="small"
              border-color="#572e57"
              Calificación
              options={topCalificaciones.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="Calificación"  color="secondary" />}
            />
          </Grid>
        </Grid >
      </div>

    </Section >
  );
}

const Section = styled.section`
  border: 0.01rem solid black;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${TitleStyles};
  
  .container {
    align-item: center;
    background: linear-gradient(to right, #572e57, #834e6d, #572e57);
    padding: 0.3vw;
    
    input {
      border: none;
      padding: 1.5rem 16rem 1.5rem 16rem;
      font-size: 1.3rem;
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 1rem 5rem;
      background-color: transparent;
      border: none;
      font-size: 1.3rem;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5rem;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        letter-spacing: 0.6rem;
        padding: 1rem .7rem;
      }
    }
  }
  @media screen and (min-width: 260px) and (max-width: 1080px) {
    .container {
      padding: 0.8rem;
      border-radius: 0.5rem;
      input {
        width: 50vw;
        padding: 0.5rem;
        border-radius: 0.5rem;
      }
      button {
        margin-top: 0.5rem;
        width: 100%;
        padding: 0.5rem;
        &:hover {
          padding: 0.5rem 1rem;
        }
      }
    }
  }
`;
