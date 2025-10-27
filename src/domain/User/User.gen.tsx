/* TypeScript file generated from User.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as UserJS from './User.res.js';

import type {Timestamp_t as Core_Timestamp_t} from '../../../src/domain/Core.gen.tsx';

import type {Uuid_t as Core_Uuid_t} from '../../../src/domain/Core.gen.tsx';

import type {Validation_result as Core_Validation_result} from '../../../src/domain/Core.gen.tsx';

export type Role_t = "User" | "Admin";

export type t = {
  readonly id: Core_Uuid_t; 
  readonly email: string; 
  readonly firstName: string; 
  readonly lastName: string; 
  readonly role: Role_t; 
  readonly isActive: boolean; 
  readonly createdAt: Core_Timestamp_t; 
  readonly updatedAt: Core_Timestamp_t; 
  readonly lastLoginAt: (undefined | Core_Timestamp_t)
};

export type Session_t = {
  readonly userId: Core_Uuid_t; 
  readonly token: string; 
  readonly expiresAt: Core_Timestamp_t; 
  readonly createdAt: Core_Timestamp_t; 
  readonly ipAddress: (undefined | string); 
  readonly userAgent: (undefined | string)
};

export const Role_toString: (role:Role_t) => string = UserJS.Role.toString as any;

export const Role_fromString: (str:string) => (undefined | Role_t) = UserJS.Role.fromString as any;

export const Role_canManageOutages: (role:Role_t) => boolean = UserJS.Role.canManageOutages as any;

export const Role_canManageUsers: (role:Role_t) => boolean = UserJS.Role.canManageUsers as any;

export const create: (id:Core_Uuid_t, email:string, firstName:string, lastName:string, role:Role_t, isActive:(undefined | boolean), createdAt:Core_Timestamp_t, updatedAt:Core_Timestamp_t, lastLoginAt:(undefined | Core_Timestamp_t)) => Core_Validation_result<t> = UserJS.create as any;

export const updateLastLogin: (user:t) => t = UserJS.updateLastLogin as any;

export const deactivate: (user:t) => t = UserJS.deactivate as any;

export const activate: (user:t) => t = UserJS.activate as any;

export const changeRole: (user:t, newRole:Role_t) => t = UserJS.changeRole as any;

export const fullName: (user:t) => string = UserJS.fullName as any;

export const canPerformAction: (user:t, action:string) => boolean = UserJS.canPerformAction as any;

export const isEligibleForNotifications: (user:t) => boolean = UserJS.isEligibleForNotifications as any;

export const Session_create: (userId:Core_Uuid_t, token:string, expiresAt:Core_Timestamp_t, createdAt:Core_Timestamp_t, ipAddress:(undefined | string), userAgent:(undefined | string)) => Core_Validation_result<Session_t> = UserJS.Session.create as any;

export const Session_isExpired: (session:Session_t) => boolean = UserJS.Session.isExpired as any;

export const Session_timeUntilExpiry: (session:Session_t) => number = UserJS.Session.timeUntilExpiry as any;

export const Session_isValidForIp: (session:Session_t, ipAddress:string) => boolean = UserJS.Session.isValidForIp as any;

export const Session_isValidForUserAgent: (session:Session_t, userAgent:string) => boolean = UserJS.Session.isValidForUserAgent as any;

export const Session_shouldRotate: (session:Session_t) => boolean = UserJS.Session.shouldRotate as any;

export const Session_generateSecureToken: () => string = UserJS.Session.generateSecureToken as any;

export const Session_refresh: (session:Session_t, newExpiresAt:Core_Timestamp_t) => Core_Validation_result<Session_t> = UserJS.Session.refresh as any;

export const Session: {
  shouldRotate: (session:Session_t) => boolean; 
  timeUntilExpiry: (session:Session_t) => number; 
  isValidForIp: (session:Session_t, ipAddress:string) => boolean; 
  isValidForUserAgent: (session:Session_t, userAgent:string) => boolean; 
  isExpired: (session:Session_t) => boolean; 
  refresh: (session:Session_t, newExpiresAt:Core_Timestamp_t) => Core_Validation_result<Session_t>; 
  generateSecureToken: () => string; 
  create: (userId:Core_Uuid_t, token:string, expiresAt:Core_Timestamp_t, createdAt:Core_Timestamp_t, ipAddress:(undefined | string), userAgent:(undefined | string)) => Core_Validation_result<Session_t>
} = UserJS.Session as any;

export const Role: {
  fromString: (str:string) => (undefined | Role_t); 
  canManageOutages: (role:Role_t) => boolean; 
  canManageUsers: (role:Role_t) => boolean; 
  toString: (role:Role_t) => string
} = UserJS.Role as any;
