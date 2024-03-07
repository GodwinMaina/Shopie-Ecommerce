
import{Router} from "express";

import { createCart, createCarty, deleteCart, deleteCarty, getAllUsersCarts, getCarty, getUserCart, updateCart } from "../controllers/cartController";
import { verifyToken } from "../middleware/verifyToken";

const cartRouter=Router();


cartRouter.post('/add/', createCart);
cartRouter.get('/', getAllUsersCarts )
cartRouter.get('/:user_id',  getUserCart)
cartRouter.patch('/:user_id/:cart_id',updateCart)  //try PATCH
cartRouter.delete('/delete/:cart_id', deleteCart);

//logic 2
cartRouter.post('/carty/', createCarty);
cartRouter.get('/getCarty/:user_id', getCarty);
cartRouter.delete('/carty/delete/:cart_id', deleteCarty);

export default cartRouter;