export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';

export const MODULE_NAMES = {
  USER_CLIENT_MICROSERVICE: 'USER_CLIENT_MICROSERVICE',
};

export const USER_PATTERN_NAMES = {
  CREATE_USER: 'user.create',
  UPDATE_USER: 'user.update',
  DELETE_USER: 'user.delete',
  GET_USER_BY_EMAIL: 'user.get_by_email',
  GET_USERS: 'user.get_users',
};

export const ROLE_PATTERN_NAMES = {
  CREATE_ROLE: 'role.create',
  UPDATE_ROLE: 'role.update',
  DELETE_ROLE: 'role.delete',
  GET_ROLE_BY_ID: 'role.get_by_id',
  GET_ROLES: 'role.get_roles',
};

export const PERMISSION_PATTERN_NAMES = {
  CREATE_PERMISSION: 'permission.create',
  UPDATE_PERMISSION: 'permission.update',
  DELETE_PERMISSION: 'permission.delete',
  GET_PERMISSION_BY_ID: 'permission.get_by_id',
  GET_PERMISSIONS: 'permission.get_permissions',
};

export const AUTH_PATTERN_NAMES = {
  SIGN_IN: 'auth.sign_in',
  REQUEST_RESET_PASSWORD: 'auth.request_reset_password',
  RESET_PASSWORD: 'auth.reset_password',
  CHANGE_PASSWORD: 'auth.change_password',
};
