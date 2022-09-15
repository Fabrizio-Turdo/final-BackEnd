import {Router} from 'express';
import Api from '../apiClass';


const router = Router();
const api = new Api("/dataBase/zapatillas.json")
//1.A
router.get('/', async (req,res)=>{
    const zapatillas = await api.findAll()
    res.json(zapatillas)
})

router.get('/:id', async (req,res)=>{
    const {id} = req.params
    const zapatilla = await api.findById(id)
    res.json(zapatilla)
})
//1.B
router.post('/', async (req,res)=>{
    const obj = req.body 
    const zapatilla = await api.create(obj)
    res.json(zapatilla)
})




export default router;



