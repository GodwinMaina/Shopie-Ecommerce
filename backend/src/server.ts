
import express, {NextFunction, Request, Response, json} from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';

import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';


const app = express()

app.use(json())
 app.use(cors());

 app.use(bodyParser.urlencoded({ extended: false }));

 app.use(express.urlencoded({ extended: true }));

 
app.use('/users',userRouter)
app.use('/products', productRouter)

app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
    res.json({
        message: error.message
    })
    next()
})


let port = 4000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`); 
})