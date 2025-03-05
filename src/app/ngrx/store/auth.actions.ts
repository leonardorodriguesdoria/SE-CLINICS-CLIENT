import { createAction, props } from '@ngrx/store';

export const userLogin = createAction(
  '[Auth] Login',
  props<{ credentials: { email: string; password: string } }>()
);

export const userloginSucess = createAction(
  '[Auth] Login Sucess',
  props<{
    token: string;
    user: { name: string; email: string; profileImage: string };
  }>
);

export const userloginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const userlogout = createAction('[Auth] Logout');

export const loadUserFromToken = createAction('[Auth] Load User From Token');
