/* TypeScript file generated from ValidationUtils.res by genType. */

/* eslint-disable */
/* tslint:disable */

import * as ValidationUtilsJS from './ValidationUtils.res.js';

export const isNotEmpty: (value:string, fieldName:string) => (undefined | string) = ValidationUtilsJS.isNotEmpty as any;

export const hasMinLength: (value:string, minLength:number, fieldName:string) => (undefined | string) = ValidationUtilsJS.hasMinLength as any;

export const hasMaxLength: (value:string, maxLength:number, fieldName:string) => (undefined | string) = ValidationUtilsJS.hasMaxLength as any;

export const matchesPattern: (value:string, pattern:RegExp, fieldName:string, errorMsg:string) => (undefined | string) = ValidationUtilsJS.matchesPattern as any;

export const isInRange: (value:number, min:number, max:number, fieldName:string) => (undefined | string) = ValidationUtilsJS.isInRange as any;

export const isPositive: (value:number, fieldName:string) => (undefined | string) = ValidationUtilsJS.isPositive as any;

export const emailRegex: RegExp = ValidationUtilsJS.emailRegex as any;

export const isValidEmail: (email:string) => (undefined | string) = ValidationUtilsJS.isValidEmail as any;

export const escapeHtml: (unsafe:string) => string = ValidationUtilsJS.escapeHtml as any;

export const secureUrlRegex: RegExp = ValidationUtilsJS.secureUrlRegex as any;

export const devUrlRegex: RegExp = ValidationUtilsJS.devUrlRegex as any;

export const isValidUrl: (url:string, isProduction:(undefined | boolean)) => (undefined | string) = ValidationUtilsJS.isValidUrl as any;

export const phoneRegex: RegExp = ValidationUtilsJS.phoneRegex as any;

export const isValidPhone: (phone:string) => (undefined | string) = ValidationUtilsJS.isValidPhone as any;

export const validateAll: (validations:Array<(undefined | string)>) => string[] = ValidationUtilsJS.validateAll as any;
