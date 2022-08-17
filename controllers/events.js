const {response} = require('express')
const Evento = require('../models/Evento')




const getEvento = async(req,res= response)=>{
    const eventos = await Evento.find().populate('user','name');

res.json({
    ok:true,
    msg:'mostrarEventos',
    eventos
})
}
const crearEvento = async(req,res= response)=>{
    // verificar q tenga el evento
    const evento = new Evento(req.body)
    try {
        evento.user = req.uid
         const  eventoGuardado=await evento.save()
        res.json({
            ok:true,
            evento:eventoGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:"false",
            msg:"Hable con el administrador"
        })
    }
    }
    
    const actualizarEvento = async(req,res= response)=>{
        const eventoId = req.params.id;
        const uid=req.uid;

        try {
            const evento  =  await Evento.findById(eventoId)
            if(!evento){
                 return res.status(404).json({
                    ok:false,
                    msg:'Evento no existe por ese id'
                })
            }
            //  validar para q la misma peronsa q creo el evento pueda editar
            if(evento.user.toString()!==uid){
                return res.status(401).json({
                    ok:false,
                    msg:'No tiene privilegio de editar este evento'
                })
            }
            const nuevoEvento ={
                ...req.body,
                user:uid
            }
            const eventoActulizado= await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});
            res.json({
                ok:true,
                evento:eventoActulizado
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'hable con el admin'
            })
            
        }
        }

        const eliminarEvento = async(req,res= response)=>{
            const eventoId = req.params.id;
            const uid=req.uid;
    
            try {
                const evento  =  await Evento.findById(eventoId)
                if(!evento){
                     return res.status(404).json({
                        ok:false,
                        msg:'Evento no existe por ese id'
                    })
                }
                //  validar para q la misma peronsa q creo el evento pueda editar
                if(evento.user.toString()!==uid){
                    return res.status(401).json({
                        ok:false,
                        msg:'No tiene privilegio para eliminar este evento'
                    })
                }
                await Evento.findByIdAndDelete(eventoId);
                res.json({
                    ok:true
                })
    
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    ok:false,
                    msg:'hable con el admin'
                })
                
            }



            }
module.exports={
    crearEvento,
    actualizarEvento,
    getEvento,
    eliminarEvento
}