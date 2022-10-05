import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '@core/authentication/constants';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
