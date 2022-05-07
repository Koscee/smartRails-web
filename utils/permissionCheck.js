import ROLE from './roles';

export const isSuperAdmin = (role) => role === ROLE.SUPER_ADMIN;

export const isBasicAdmin = (role) => role === ROLE.ADMIN;

export const isSuperOrBasicAdmin = (role) =>
  role === ROLE.SUPER_ADMIN || role === ROLE.ADMIN;

export const isUser = (role) => role === ROLE.USER;
