export interface Address {
  addressId: string;
  street: string;
  village: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  schoolId?: string | null;
  userId?: string | null;
}

export interface AddressState {
  addresses: Address[];
  address: Address | null;
  loading: boolean;
  error: string | null;
}