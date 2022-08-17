
// events router /api/events

const { Router } = require("express");
const {check} = require('express-validator')
const{validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')
const { crearEvento,actualizarEvento,getEvento,eliminarEvento} = require('../controllers/events');
const { isDate } = require("../helpers/isDate");
const router = Router();
router.use(validarJWT)

// obtener evento
router.get('/',getEvento)
// crear  nuevo evento 
router.post(
    '/',[
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio obligatoria').custom(isDate),
        check('end','Fecha de finalizacion obligatoria').custom(isDate),
        validarCampos
    ]
,crearEvento)
// actualizar evento
router.put('/:id',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio obligatoria').custom(isDate),
    check('end','Fecha de finalizacion obligatoria').custom(isDate),
    validarCampos
],actualizarEvento)
// borrar evento 
router.delete('/:id',eliminarEvento)

module.exports = router;