/* TypeScript file generated from Outage.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as OutageJS from './Outage.res.js';

import type {Location_t as Core_Location_t} from '../../../src/domain/Core.gen.tsx';

import type {Percentage_t as Core_Percentage_t} from '../../../src/domain/Core.gen.tsx';

import type {Timestamp_t as Core_Timestamp_t} from '../../../src/domain/Core.gen.tsx';

import type {Uuid_t as Core_Uuid_t} from '../../../src/domain/Core.gen.tsx';

import type {Validation_result as Core_Validation_result} from '../../../src/domain/Core.gen.tsx';

export type Status_t = 
    "Unverified"
  | "Verified"
  | "InProgress"
  | "Resolved";

export type t = {
  readonly id: Core_Uuid_t; 
  readonly status: Status_t; 
  readonly confidencePercentage: Core_Percentage_t; 
  readonly title: string; 
  readonly description: (undefined | string); 
  readonly location: Core_Location_t; 
  readonly affectedCustomers: number; 
  readonly estimatedRestoration: (undefined | Core_Timestamp_t); 
  readonly actualRestoration: (undefined | Core_Timestamp_t); 
  readonly reportedAt: Core_Timestamp_t; 
  readonly createdAt: Core_Timestamp_t; 
  readonly updatedAt: Core_Timestamp_t
};

export const Status_toString: (status:Status_t) => string = OutageJS.Status.toString as any;

export const Status_fromString: (str:string) => (undefined | Status_t) = OutageJS.Status.fromString as any;

export const Status_canTransition: (from:Status_t, to_:Status_t) => boolean = OutageJS.Status.canTransition as any;

export const create: (id:Core_Uuid_t, status:Status_t, confidencePercentage:number, title:string, description:(undefined | string), location:Core_Location_t, affectedCustomers:(undefined | number), estimatedRestoration:(undefined | Core_Timestamp_t), actualRestoration:(undefined | Core_Timestamp_t), reportedAt:Core_Timestamp_t, createdAt:Core_Timestamp_t, updatedAt:Core_Timestamp_t) => Core_Validation_result<t> = OutageJS.create as any;

export const isActive: (outage:t) => boolean = OutageJS.isActive as any;

export const updateStatus: (outage:t, newStatus:Status_t) => Core_Validation_result<t> = OutageJS.updateStatus as any;

export const markAsResolved: (outage:t) => Core_Validation_result<t> = OutageJS.markAsResolved as any;

export const calculateEstimatedRestoration: (outage:t) => (undefined | Core_Timestamp_t) = OutageJS.calculateEstimatedRestoration as any;

export const isHighConfidence: (outage:t) => boolean = OutageJS.isHighConfidence as any;

export const isCritical: (outage:t) => boolean = OutageJS.isCritical as any;

export const Status: {
  fromString: (str:string) => (undefined | Status_t); 
  toString: (status:Status_t) => string; 
  canTransition: (from:Status_t, to_:Status_t) => boolean
} = OutageJS.Status as any;
