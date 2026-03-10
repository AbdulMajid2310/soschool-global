export interface SchoolAddress {
  schoolAddressId: string;
  street: string;
  village: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  schoolId: string;
}

export interface SchoolAddressState {
  address: SchoolAddress | null;
  addresses: SchoolAddress[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface CreateSchoolAddressDto extends Omit<
  SchoolAddress,
  "schoolAddressId"
> {}
export interface UpdateSchoolAddressDto extends Partial<CreateSchoolAddressDto> {}
