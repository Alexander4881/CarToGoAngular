export interface Customer {
  id?: number;
  email: string;
  password: string;
  sex: boolean;
  firstName: string;
  aftertName: string;
  address: string;
  phoneNumber: string;
  bithDate: string;
  driversLicens: DriversLicens;
  creditCards: CreditCard;
}

export interface DriversLicens {
  id?: number;
  driversLicensNumber: string;
  country: string;
  validityDate: string;
  expiryDate: string;
}

export interface CreditCard {
  id?: number;
  creditCardNumber: string;
  creditCardHolder: string;
  expiryDate: string;
  ccv: string;
}

export interface LoginAuthentication {
  email: string;
  passWord: string;
}
