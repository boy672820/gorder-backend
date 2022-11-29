// Common
export enum OrderBy {
  Asc = 'asc',
  Desc = 'desc',
}

// Enumerable tables
export enum Store {
  Genie = 1,
}

export enum OrderType {
  Pickup = 'Pickup',
  Order = 'Order',
}

export enum OrderStatus {
  Pending = 'Pending', // 주문대기
  Confirmed = 'Confirmed', // 주문확인
  Delivering = 'Delivering', // 배송중
  Completed = 'Completed', // 주문완료
  Cancelled = 'Cancelled', // 주문취소
}
