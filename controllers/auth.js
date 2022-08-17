const {response} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const {generarJWT}= require('../helpers/jwt')
const crearUsuario= async(req,res=response)=>{
    // post nuevo usuario poste de infromacion 
    const {email,password}= req.body
    //  importar modelo  y guardamos en la base de datos 
    try {
        // findOne  busca los registros q tenga esa valor 
        let usuario =  await Usuario.findOne({email})
        if(usuario){
            res.status(400).json({
                ok:false,
                msg:'Un usuario existe con ese correo'
            });
        }
         usuario = new Usuario(req.body);
       
        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt)

         // guardamos en la base de datos
     await usuario.save();
    //  generar el jwt
    const token =await generarJWT(usuario.id,usuario.name)
    res.status(201).json({
    ok:true,
    ui:usuario.id,
    name:usuario.name,
    token
})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador '
        })
    }
    
}
const loginUsuario=async(req,res=response)=>{
        // post nuevo usuario poste de infromacion 
        const {email,password}= req.body
        try {
            const usuario =  await Usuario.findOne({email})
        if(!usuario){
            res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese email'
            });
        }
        // confirmar los password
        const validPasword= bcrypt.compareSync(password,usuario.password);
        if(!validPasword){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            })
        }
    // generar nuestro jwt
    const token =await generarJWT(usuario.id,usuario.name)

    res.json({
        ok:true,
        uid:usuario.id,
        name:usuario.name,
        token
    })
       
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok:false,
                msg:'hable con el administrador '
            })
        }
    }
const rivalidarToquen = async(req,res=response)=>{
    const {uid,name}= req
    //  generar un nuevo JWT y retornarlo en esta aplicacion 
    const token =await generarJWT(uid,name)


        // post nuevo usuario poste de infromacion 
    res.json({
        ok:true,
        token
    })
}
module.exports={
    crearUsuario,
    loginUsuario,
    rivalidarToquen
}