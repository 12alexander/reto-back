import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTGuardModule } from 'src/guards/jwt.guard.module';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JWTGuardModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
