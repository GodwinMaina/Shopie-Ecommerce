
import{Router} from "express";

import { createCart, deleteCart, getAllUsersCarts, getUserCart, updateCart } from "../controllers/cartController";
import { verifyToken } from "../middleware/verifyToken";

const cartRouter=Router();


cartRouter.post('/add/', createCart);
cartRouter.get('/', getAllUsersCarts )
cartRouter.get('/:user_id',  getUserCart)
cartRouter.patch('/:user_id/:cart_id',updateCart)  //try PATCH
cartRouter.delete('/:cart_id', deleteCart);


export default cartRouter;