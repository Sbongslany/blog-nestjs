import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {PassportModule} from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  JwtModule.register({
    secret: process.env.SECRET,
    signOptions: {
      expiresIn: 3600,
    },
  }),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  providers: [AuthService],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
