import { UserService } from '../modules/user/user.service';
import * as express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { UserController } from '../modules/user/user.controller';
import { UserRepository } from '../modules/user/user.repo';
import { User } from '../models/user.schema';
const router = express.Router();
const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const appController = new UserController(userService);

router.post('/register', (req, res) => appController.register(req, res));
router.post('/login', (req, res) => appController.login(req, res));
router.get('/profile', verifyToken, (req, res) => appController.profile(req, res));

module.exports = router;
