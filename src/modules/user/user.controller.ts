import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController{
  constructor(
    private readonly userService:UserService,
  ){}

  public async register(req: Request, res: Response){
    await this.userService.createUser(req,res)
  }

  public async login(req: Request, res: Response){
     await this.userService.createToken(req, res)
  }

  public async profile(req: any, res: any){
    await this.userService.getUser(req, res)
  }
}
