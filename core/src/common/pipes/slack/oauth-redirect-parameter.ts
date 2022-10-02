import { PipeTransform, Injectable } from '@nestjs/common';
import { InvalidCredentialsException } from '@core/common/errors/auth';

@Injectable()
export class SlackOAuthRedirectParameterPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new InvalidCredentialsException();
    }

    return value;
  }
}
