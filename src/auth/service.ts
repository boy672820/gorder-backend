import { Injectable } from '@nestjs/common';
import { SlackService } from '@providers/slack';
import { PrismaService } from '@providers/mysql/prisma';
import { Prisma, User } from '@prisma/client';
import { UsersIdentityResponse } from '@slack/web-api';

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
  private async getTokenAndIdentity(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
    identity: UsersIdentityResponse;
  }> {
    const authedUser = await this.slack.accessAuthedUser(code);
    const identity = await this.slack.getIdentity(authedUser.access_token);

    const accessToken = authedUser.access_token;
    const refreshToken = authedUser.refresh_token;

    return { accessToken, refreshToken, identity };
  }

  // --------------------------------------------------------------------------

  /**
   * Find or create user by Slack OAuth code
   * @param code Slack OAuth code
   */
  async findOrCreate(code: string): Promise<User> {
    // Slack OAuth & get tokens
    const { accessToken, refreshToken, identity } =
      await this.getTokenAndIdentity(code);

    // Find or create user
    const user = await this.prisma.user.findUnique<Prisma.UserFindUniqueArgs>({
      where: { email: identity.user.email },
      select: { userId: true },
    });

    // If user exists, update access token
    if (!user) {
      return this.prisma.user.create({
        data: {
          email: identity.user.email,
          Authentication: { create: { accessToken, refreshToken } },
        },
      });
    }

    // If user exists, update access token
    await this.prisma.authentication.update({
      where: { userId: user.userId },
      data: { accessToken, refreshToken },
    });

    return user;
  }

  /**
   * Get user identity by access token
   * @param token Access token
   * @returns User identity
   */
  getIdentity(token: string) {
    return this.slack.getIdentity(token);
  }
}
