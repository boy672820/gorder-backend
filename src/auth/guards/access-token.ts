import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SLACK_ACCESS_TOKEN } from '../constants';

@Injectable()
export class AccessTokenGuard extends AuthGuard(SLACK_ACCESS_TOKEN) {}
