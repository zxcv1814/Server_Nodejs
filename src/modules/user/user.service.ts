import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { UserRepository } from './user.repositories';
import { IUser, User } from '../../models/user.schema';

export class UserService {

  constructor(
    private readonly repo: UserRepository,
  ) {
    this.repo = new UserRepository(User)
  }

  async createUser(req: Request, res: Response) {
    try {
      const email = req.body.email;
      if (typeof email !== 'string') {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const existingUser = await this.repo.findOne(email);

      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const userData: Partial<IUser> = req.body;
      await this.repo.create(userData);
      res.status(201).json({ message: 'Register success' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createToken(req: Request, res: Response) {
    try {
      const email = req.body.email;
      if (typeof email !== 'string') {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const user = await this.repo.findOne(email);
      if (!user) {
        return res.status(404).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(404).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUser(req: any, res: Response) {
    try {
      const email = req.user.email;
      if (typeof email !== 'string') {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const user = await this.repo.findOne(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ username: user.username, email: user.email });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
