import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTGuardModule } from 'src/guards/jwt.guard.module';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JWTGuardModule,
  ],
  providers: [],
  controllers: [],
})
export class UserModule {}
