//  esprresa
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const {dbConnection} = require('./database/config')
//  crear el servidor de express
const app = express();
// escuchar peticiones 
// configurar las tura 
// base de datos 
dbConnection();
//  cors
app.use(cors())
// directorio public
app.use(express.static('public'));
//  lectura y parseo del body 
app.use(express.json())

//  RUTAS 
app.use('/api/auth',require('./routes/auth'))
//  TODO: CRUD:eventos 
app.use('/api/events',require('./routes/events'))

app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto${process.env.PORT}` )
})
//  variables de entorno para el puerto de produccion 