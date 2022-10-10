import { BadRequestException } from '@nestjs/common';

export class InvalidProductIdException extends BadRequestException {
  constructor() {
    super('잘못된 상품정보 입니다.');
  }
}
