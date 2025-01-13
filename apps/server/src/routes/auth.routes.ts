import express, { Router , Response  , Request} from 'express';
import { signin, signup } from '../controllers/auth.controllers'
import { authenticateToken } from '../middleware/auth.middleware';

const router : Router = express.Router();

router.post('/signup', signup );

router.post('/signin', signin );

router.get('/protectDashBoard' , authenticateToken , ( req :Request ,  res : Response )  : void =>{
  res.status(200).json({valid : true })
  return ;
} )
export default router;
