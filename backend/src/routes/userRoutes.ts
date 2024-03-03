import{Router} from "express";
import { RegisterUser, deleteUser, getAllUsers, getOneUser, updateUser } from "../controllers/userController";
import { loginUser, resetPassword } from "../controllers/authController";

const userRouter = Router();


//registerUser
userRouter.post('/register',RegisterUser);

//loginUser
userRouter.post('/auth/login', loginUser);

//getAllUsers
userRouter.get('/', getAllUsers);

//getOneUser
userRouter.get('/:id', getOneUser);

//update user
userRouter.put('/update/:id', updateUser);

//delete User
userRouter.delete('/delete/:id', deleteUser);

//reset Password
userRouter.put('/resetPassword', resetPassword);









export default userRouter;