import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Container, Box, Autocomplete, Grid } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { makeStyles } from '@material-ui/core/styles'; //sin esto no funciona por más que lo actualice, probar de sacar el resto para la v5
import { NavLink } from 'react-router-dom';
import CustomFileInput from "./CustomFileInput.js";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import classNames from "classnames";
import SubirFoto from './SubirFoto';
import { useParams } from 'react-router-dom';


//validacion
import { useFormik } from 'formik';
import * as yup from "yup" //libreria de esquemas de validacion
import Exito from "./Exito"
import { Formik, Field, FieldProps } from "formik";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";

//back
import { editarReceta, uploadImg, obtenerRecetaID } from "../controllers/recetaController"


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: "10px",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#834e6d",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    botón: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: "120px",
        backgroundColor: "#834e6d",
    },
}));

const validationSchema = yup.object
    ({
        titulo: yup
            .string()
            //.matches(/^[A-Za-z ]*$/, 'Ingresar título válido')
            .matches(/^[A-ZÑÁÉÍÓÚÜa-zñáéíóúü ]*$/, 'Ingresar título válido')
            .min(2, "Debe contener al menos 2 letras")
            .required(""),

        categoria: yup
            .string()
            .required("Obligatorio"),

        dificultad: yup
            .string()
            .required("Obligatorio"),

        ingredientes: yup
            .string()
            .min(2, "Debe contener al menos 2 letras")
            .required("Obligatorio"),

        procedimiento: yup
            .string()
            .min(2, "Debe contener al menos 2 letras")
            .required("Obligatorio"),


    })

const EditarReceta = (props) => {

    const classes = useStyles();

    const [toggle, setToggle] = useState(false);
    const [imgAux, setImgAux] = React.useState('');
    const { id } = useParams();
    const [cat, setCat] = useState('');
    const [dificultad, setDificultad] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [procedimiento, setProcedimiento] = useState('');
    const [calificacionProm, setcalificacionProm] = useState('');
    const [calificacionTotal, setcalificacionTotal] = useState('');
    const [usrTotales, setusrTotales] = useState('');
    const [imagen, setImagen] = useState('');
    const [autor, setAutor] = useState('');
    const [nombre, setNombre] = useState('');
    

    useEffect(() => {
        async function componentDidUpdate() {
            let rdo = await obtenerRecetaID(id);
            console.log("dentro de rdo", rdo)
            if (rdo.length > 0) {
              setCat(rdo[0].categoria);
              localStorage.setItem("categoria",rdo[0].categoria )
              setImagen(rdo[0].nombreImagen);
              setDificultad(rdo[0].dificultad);
              localStorage.setItem("dificultad",rdo[0].dificultad )
              setIngredientes(rdo[0].ingredientes);
              localStorage.setItem("ingredientes",rdo[0].ingredientes )
              setProcedimiento(rdo[0].procedimiento);
              localStorage.setItem("procedimiento",rdo[0].procedimiento )
              setAutor(rdo[0].autor);
              localStorage.setItem("categoria",rdo[0].autor )
              setNombre(rdo[0].nombre);
              localStorage.setItem("nombre",rdo[0].nombre )
            }
          }
          componentDidUpdate();
        }, [id]);
    



    const formik = useFormik({
        initialValues:
        {
            nombre: `${localStorage.getItem("nombre")}`,
            categoria: `${localStorage.getItem("categoria")}`,
            dificultad: `${localStorage.getItem("dificultad")}`,
            ingredientes: `${localStorage.getItem("ingredientes")}`,
            procedimiento: `${localStorage.getItem("procedimiento")}`,
            nombreImagen: ``,
        },

        onSubmit: (values) => {
            console.log(JSON.stringify(values))
        },

        validationSchema: validationSchema

    });

    
    
    
    const guardarImagen = () => {
        subirImagen();
    }

    const subirImagen = async function (receta) {
        let files = [];
        let nombres = [];
        let archivoImagen = '';

        if (imgAux !== '') {
            console.log("imgAux", imgAux);
            files.push(imgAux);

            //buscar extension archivo
            let archivoOrig = imgAux.name;
            let posExt = archivoOrig.indexOf('.');
            let extension = archivoOrig.substring(posExt, archivoOrig.length);
            let aleatorio = Math.random().toString().substring(2, 15);
            nombres.push("img" + localStorage.getItem('nombre') + "_" + aleatorio + extension);


            //subir archivo a servidor
            console.log(files);
            console.log(nombres);

            archivoImagen = await uploadImg(files, nombres);
            validarReceta(nombres);
        }
    }


   



    const validarReceta = async function () {
        
        
        
        let datos = {
            _id: props.match.params.id,
            nombre: formik.values.nombre,
            categoria: formik.values.categoria,
            dificultad: formik.values.dificultad,
            ingredientes: formik.values.ingredientes,
            procedimiento: formik.values.procedimiento,
            nombreImagen: formik.values.nombreImagen,
        }
        let nuevoDato = await editarReceta(datos);
        console.log(datos._id);
        if (nuevoDato.rdo === 0) {
            //setUsuarioValido(true);
            setToggle(!toggle)
            console.log("Receta actualizado")
        }
        if (nuevoDato.rdo === 1) {
            alert(nuevoDato.mensaje)
        }

    }

    if (toggle === false) {

        return (
            <Container component="main" maxWidth="xs">{/*ajustar para pantallas mas grandes*/}
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <UploadFileIcon />
                    </Avatar>
                    <h2> Nueva Receta</h2>
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>


                        <Box
                            sx={{
                                mt: 5, display: 'flex',
                                flexDirection: 'column',
                                color: 'secondary',
                                alignItems: 'center'
                            }}>

                            <CustomFileInput
                                className={classes.footerButtons}
                                color="secondary"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                getImagen={(i) => setImgAux(i)}
                                inputProps={{
                                    placeholder: "Selecciona una imagen"
                                }}
                                endButton={{
                                    buttonProps: {
                                        round: true,
                                        color: "secondary",
                                        justIcon: true,
                                        fileButton: true
                                    },
                                    icon: <AddAPhotoIcon />
                                }}

                            />
                        </Box>
                        <h5>Recorda que el tamaño maximo de la imagen es 3MB</h5>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            color='secondary'
                            required
                            fullWidth
                            id="titulo"
                            label="Nombre"
                            name="titulo"
                            //autoComplete="email"
                            autoFocus
                            value={formik.values.titulo}
                            onChange={formik.handleChange}
                            error={formik.touched.titulo && Boolean(formik.errors.titulo)}
                            helperText={formik.touched.titulo && formik.errors.titulo}
                            onBlur={formik.handleBlur}
                        />
                        {/* <Filtros /> */}
                        <Grid container direction="row">
                            <Grid item xs={12} md={12}>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" color='secondary'>Dificultad</InputLabel>
                                        <Select
                                            labelId="dificultad"
                                            id="dificultad"
                                            value={formik.values.dificultad}
                                            label='dificultad'
                                            name="dificultad"
                                            color='secondary'
                                            onChange={formik.handleChange}
                                            error={formik.touched.dificultad && Boolean(formik.errors.dificultad)}
                                            helperText={formik.touched.dificultad && formik.errors.dificultad}
                                            onBlur={formik.handleBlur}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid >

                        <Grid container direction="row">
                            <Grid item xs={12} md={12}>
                                <Box sx={{ mt: 1 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" color='secondary'>Categoria</InputLabel>
                                        <Select
                                            labelId="Categoria"
                                            id="categoria"
                                            value={formik.values.categoria}
                                            label='categoria'
                                            name="categoria"
                                            color='secondary'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.categoria && Boolean(formik.errors.categoria)}
                                            helperText={formik.touched.categoria && formik.errors.categoria}
                                        >
                                            <MenuItem value={"Postres"}>Postres</MenuItem>
                                            <MenuItem value={"Carnes"}>Carnes</MenuItem>
                                            <MenuItem value={"Frituras"}>Frituras</MenuItem>
                                            <MenuItem value={"Pasteleria"}>Pasteleria</MenuItem>
                                            <MenuItem value={'Guisos y sopas'}>Guisos y sopas</MenuItem>
                                            <MenuItem value={"Arroces y pastas"}>Arroces y pastas</MenuItem>
                                            <MenuItem value={"Pizzas"}>Pizzas</MenuItem>
                                            <MenuItem value={"Panes"}>Panes</MenuItem>
                                            <MenuItem value={"Vegetarianas"}>Vegetarianas</MenuItem>
                                            <MenuItem value={"Otros"}>Otros</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid >

                        <Box sx={{ mt: 2 }}>
                            <TextField
                                id="ingredientes"
                                name="ingredientes"
                                label="Ingredientes"
                                color='secondary'
                                value={formik.values.ingredientes}
                                onChange={formik.handleChange}
                                error={formik.touched.ingredientes && Boolean(formik.errors.ingredientes)}
                                helperText={formik.touched.ingredientes && formik.errors.ingredientes}
                                onBlur={formik.handleBlur}
                                fullWidth
                                multiline
                                maxRows={12}
                            />
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <TextField
                                id="procedimiento"
                                name="procedimiento"
                                label="Procedimiento"
                                color='secondary'
                                multiline
                                fullWidth
                                maxRows={12}
                                value={formik.values.procedimiento}
                                onChange={formik.handleChange}
                                error={formik.touched.procedimiento && Boolean(formik.errors.procedimiento)}
                                helperText={formik.touched.procedimiento && formik.errors.procedimiento}
                                onBlur={formik.handleBlur}
                            />
                        </Box>


                        <Box
                            sx={{
                                mt: 5, display: 'flex',
                                flexDirection: 'column',
                                color: 'secondary',
                                alignItems: 'center'
                            }}>


                        </Box>

                        <Box sx={{ mt: 5 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.botón}
                                //onClick={() => setToggle(!toggle)}

                                disabled={
                                    !(formik.isValid && formik.dirty)
                                    // (formik.errors.titulo)            
                                    // ||
                                    // ( formik.errors.ingredientes)
                                    // ||
                                    // (formik.errors.procedimiento) 
                                }
                                onClick={() => guardarImagen()}

                            >
                                Publicar Receta
                            </Button>
                        </Box>
                    </form>
                </div>

            </Container >
        );
    }
    else
        return (
            <div className={classes.paper}>
                <Exito />
                <NavLink to='/User/Recetas' style={{ textDecoration: 'none', color: 'white' }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.botón}>
                        Continuar
                    </Button>
                </NavLink>
            </div>
        )
}

export default EditarReceta