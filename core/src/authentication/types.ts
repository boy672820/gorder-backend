import { Authentication, User } from '@prisma/client';

export type JWTPayloadClaims = { userId: string };

export type JWTUserPayload = Authentication;

export type AuthResult = { userId: User['userId'] };
