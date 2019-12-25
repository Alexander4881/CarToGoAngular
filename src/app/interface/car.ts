export interface Car {
  id?: number;
  licensePlate: string;
  animalsAllowed: boolean;
  status: number;
  totalKM: number;
  carModel: CarModel;
  eletricEngine: EletricEngine;
  gpsCordinat: GPSCordinat;
}

export interface CarModel {
  id?: number;
  model: string;
  pricePerKM: number;
  pricePerMin: number;
  carBrand: CarBrand;
}

export interface CarBrand {
  id?: number;
  name: string;        
}

export interface EletricEngine {
  id?: number;
  energyLeft: number;
  kMsAvailable: number;
}

export interface GPSCordinat {
  id?: number;
  latitude: number;
  longitude: number;
  received: string;
}
