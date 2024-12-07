export interface District {
  id: number;
  name: string;
  upazilas: string[];
}
export interface Divisions {
  id: number;
  name: string;
}

export interface Districts {
  [key: string]: District[];
}

export interface FormData {
  name: string;
  address: string;
  division: string;
  district: string;
  subDistrict: string;
  phone: string;
}
export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

export enum ShippingStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
export enum UserRole {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  CUSTOMER = "CUSTOMER",
}
export enum ShopStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}
export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}
