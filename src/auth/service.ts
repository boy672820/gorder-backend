import { Injectable } from '@nestjs/common';
import { SlackService } from '@providers/slack';
import { PrismaService } from '@providers/mysql/prisma';
import { Prisma, User } from '@prisma/client';
import type { UsersIdentityResponse } from '@slack/web-api';
import { SlackAuthResult } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slack: SlackService,
  ) {}

  /**
   * Get access token and user identity by Slack OAuth code
   * @param code Slack OAuth code
   * @returns Access & Refresh token and user identity
   */
  async getTokenAndIdentity(code: string): Promise<SlackAuthResult> {
    const authedUser = await this.slack.accessAuthedUser(code);
    const identity = await this.slack.getIdentity(authedUser.access_token);

    const accessToken = authedUser.access_token;
    const refreshToken = authedUser.refresh_token;

    return { accessToken, refreshToken, identity };
  }

  /**
   * Get user identity by access token
   * @param token Access token
   * @returns User identity
   */
  getIdentity(token: string): Promise<UsersIdentityResponse> {
    return this.slack.getIdentity(token);
  }

  // --------------------------------------------------------------------------

  user({ where }: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    return this.prisma.user.findUnique<Prisma.UserFindUniqueArgs>({
      where,
      select: { userId: true, email: true, name: true },
    });
  }

  /**
   * Find or create user by Slack OAuth code
   * @param code Slack OAuth code
   */
  async findOrCreate({
    accessToken,
    refreshToken,
    identity,
  }: SlackAuthResult): Promise<User> {
    // Find or create user
    const user = await this.user({ where: { email: identity.user.email } });

    // If user exists, update access token
    if (!user) {
      return this.prisma.user.create<Prisma.UserCreateArgs>({
        data: {
          email: identity.user.email,
          name: identity.user.name,
          authentication: { create: { accessToken, refreshToken } },
        },
        select: { userId: true, email: true, name: true },
      });
    }

    // If user exists, update access token
    await this.prisma.authentication.update({
      where: { userId: user.userId },
      data: { accessToken, refreshToken },
    });

    return user;
  }
}
