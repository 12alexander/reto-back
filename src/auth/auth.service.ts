import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async signIn({ email, pass }: SignInDto) {
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user?.pass);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
  }

  async signUp(payload: SignUpDto) {
    const hashPass = await bcrypt.hash(payload.pass, 10);
    return this.userModel.create({ ...payload, pass: hashPass });
  }
}
