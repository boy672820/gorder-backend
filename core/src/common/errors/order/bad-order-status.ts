import { BadRequestException } from '@nestjs/common';

export class BadOrderStatusException extends BadRequestException {
  constructor() {
    super('잘못된 주문 상태입니다.');
  }
}
