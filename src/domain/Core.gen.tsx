/* TypeScript file generated from Core.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as CoreJS from './Core.res.js';

export type Validation_result<a> = 
    { TAG: "Valid"; _0: a }
  | { TAG: "Invalid"; _0: string[] };

export type Uuid_t = string;

export type Timestamp_t = Date;

export type Coordinates_t = { readonly latitude: number; readonly longitude: number };

export type Location_t = {
  readonly coordinates: Coordinates_t; 
  readonly address: (undefined | string); 
  readonly barangay: string; 
  readonly city: string; 
  readonly province: string
};

export type Percentage_t = number;

export const Validation_map: <T1,T2>(fn:((_1:T1) => T2), validation:Validation_result<T1>) => Validation_result<T2> = CoreJS.Validation.map as any;

export const Validation_bind: <T1,T2>(validation:Validation_result<T1>, fn:((_1:T1) => Validation_result<T2>)) => Validation_result<T2> = CoreJS.Validation.bind as any;

export const Uuid_create: (value:string) => Validation_result<Uuid_t> = CoreJS.Uuid.create as any;

export const Timestamp_create: (date:Date) => Validation_result<Timestamp_t> = CoreJS.Timestamp.create as any;

export const Coordinates_create: (latitude:number, longitude:number) => Validation_result<Coordinates_t> = CoreJS.Coordinates.create as any;

export const Coordinates_isValid: (coords:Coordinates_t) => boolean = CoreJS.Coordinates.isValid as any;

export const Coordinates_fromRecord: (record:Coordinates_t) => Validation_result<Coordinates_t> = CoreJS.Coordinates.fromRecord as any;

export const Location_create: (coordinates:Coordinates_t, address:(undefined | string), barangay:string, city:string, province:string) => Validation_result<Location_t> = CoreJS.Location.create as any;

export const Location_fromRecord: (record:Location_t) => Validation_result<Location_t> = CoreJS.Location.fromRecord as any;

export const Percentage_create: (value:number) => Validation_result<Percentage_t> = CoreJS.Percentage.create as any;

export const Percentage_toDecimal: (percentage:Percentage_t) => number = CoreJS.Percentage.toDecimal as any;

export const Percentage_fromDecimal: (decimal:number) => Validation_result<Percentage_t> = CoreJS.Percentage.fromDecimal as any;

export const Percentage_clamp: (value:number) => Percentage_t = CoreJS.Percentage.clamp as any;

export const Location: { fromRecord: (record:Location_t) => Validation_result<Location_t>; create: (coordinates:Coordinates_t, address:(undefined | string), barangay:string, city:string, province:string) => Validation_result<Location_t> } = CoreJS.Location as any;

export const Uuid: { create: (value:string) => Validation_result<Uuid_t> } = CoreJS.Uuid as any;

export const Percentage: {
  clamp: (value:number) => Percentage_t; 
  fromDecimal: (decimal:number) => Validation_result<Percentage_t>; 
  create: (value:number) => Validation_result<Percentage_t>; 
  toDecimal: (percentage:Percentage_t) => number
} = CoreJS.Percentage as any;

export const Timestamp: { create: (date:Date) => Validation_result<Timestamp_t> } = CoreJS.Timestamp as any;

export const Validation: { map: <T1,T2>(fn:((_1:T1) => T2), validation:Validation_result<T1>) => Validation_result<T2>; bind: <T1,T2>(validation:Validation_result<T1>, fn:((_1:T1) => Validation_result<T2>)) => Validation_result<T2> } = CoreJS.Validation as any;

export const Coordinates: {
  fromRecord: (record:Coordinates_t) => Validation_result<Coordinates_t>; 
  isValid: (coords:Coordinates_t) => boolean; 
  create: (latitude:number, longitude:number) => Validation_result<Coordinates_t>
} = CoreJS.Coordinates as any;
