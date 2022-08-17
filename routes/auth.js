//  rutas de usuarios  host */api/auth

const {Router}= require('express')
const {check}= require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt')
const router = Router();
const {crearUsuario,loginUsuario,rivalidarToquen}= require('../controllers/auth');
router.post('/new',[
    // middlewares
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    check('password','el password debe ser ser 6 caracetres').isLength({min:6}),
    validarCampos
],crearUsuario)
router.post('/',[
    check('email','el email es obligatorio').isEmail(),
    check('password','el password debe ser ser 6 caracetres').isLength({min:6}),
    validarCampos
],loginUsuario)
router.get('/renew',validarJWT,rivalidarToquen)
//  validar mi JWT llamar y rivalidar actualizar y validar  revalidar el JWT y validar 





module.exports= router