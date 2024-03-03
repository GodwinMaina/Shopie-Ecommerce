
import{Router} from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/productController";

const productRouter=Router();


//create product
productRouter.post('/add', createProduct);

//get All Product
productRouter.get('/', getAllProducts);

//get One Product
productRouter.get('/:id', getOneProduct);

//update product
productRouter.put('/update/:id', updateProduct);

//delete User
productRouter.delete('/delete/:id', deleteProduct);

export default productRouter;