import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AppController {}
