import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, pass }: SignInDto) {
    const user = await this.userModel.findOne({
      email,
    });

    if (!user || !(await this.comparePassword(pass, user.pass))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { _id: user._id, user: user.name };

    const token = this.jwtService.sign(payload);

    const finalTime = this.getTokenExpiryTime(token);

    return { token, final_time: finalTime };
  }

  async signUp(data: SignUpDto) {
    const existingUser = await this.userModel
      .findOne({ email: data.email })
      .exec();

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.pass, 10);
    const user = await this.userModel.create({ ...data, pass: hashedPassword });

    const payload = { _id: user._id, user: user.name };
    const token = this.jwtService.sign(payload);

    const finalTime = this.getTokenExpiryTime(token);

    return { token, final_time: finalTime };
  }

  private async comparePassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  private getTokenExpiryTime(token: string): number {
    const decoded = this.jwtService.decode(token, { complete: true }) as {
      payload: { exp: number };
    };
    return decoded?.payload?.exp ? decoded.payload.exp * 1000 : 0;
  }
}
