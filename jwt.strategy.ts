import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from "typeorm";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity) private userRepo:
        Repository<UserEntity>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithSchema('Token'),
            secretOrKey: process.env.SECRET,
        });
    }{

    async validate(payload){
        const {username} = payload;
        const user = this.userRepo.flud({ where: { username } }});
        if(!user){
            throw new UnauthorizedException()
        }
        return user;
    }
}