export interface Customer {
  id: number;
  email: string;
  password: string;
  sex: boolean;
  firstName: string;
  aftertName: string;
  address: string;
  phoneNumber: string;
  bithDate: Date;
}

export interface DriversLicens {
  id: number;
  driversLicensNumber: string;
  country: string;
  validityDate: Date;
  expiryDate: Date;
}
