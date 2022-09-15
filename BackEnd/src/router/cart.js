import {Router} from 'express';
import Api from '../apiClass';
import User from '../userClass';


const router = Router();
const api = new Api("/dataBase/cart.json")
const user = new User("/dataBase/user.json")

//2.A
router.post('/', async (req,res)=>{
    const obj = req.body 
    const cart = await api.create(obj)
    res.json(cart)
//      <------------------------> otra forma ?
    // const idCarrito = await findById(id)
})
//2.B
router.delete("/:id", async (req,res)=>{
    const {id} = req.params;
    const vaciarCarrito = await api.eliminarById(id)
    res.json(vaciarCarrito,{mensaje: 'producto eliminado.'})
})
//2.C
router.get("/:id/productos",(req,res)=>{
    res.json(cart)

})
//2.E
router.delete("/:id/productos/:id_prod",(req,res)=>{
    const {id} = req.params;
    api.eliminarById(id)
    res.json({mensaje: 'producto eliminado.'})
})

export default router;