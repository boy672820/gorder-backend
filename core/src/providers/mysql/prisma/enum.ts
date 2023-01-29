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
  Pickup = 'pickup',
  Order = 'order',
}

export enum OrderStatus {
  Pending = 'pending', // 주문대기
  Confirmed = 'confirmed', // 주문확인
  Delivering = 'delivering', // 배송중
  Completed = 'completed', // 주문완료
  Cancelled = 'cancelled', // 주문취소
}
