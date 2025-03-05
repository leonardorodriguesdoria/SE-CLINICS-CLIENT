//O arquivo em si é o próprio root reducer
import { createReducer, on } from '@ngrx/store'; // O on seria o equivalente ao hook useDispatch no Redux/ReactJs
import { IUserLogin } from '../../shared/interfaces/login-user.interface';
import { userLogin, userloginSucess, userloginFailure } from './auth.actions';

export const initialState: IUserLogin = {
  email: null,
  password: null,
};

// export const userReducer = createReducer(initialState, on(
//     userLogin, (state) => state.email = initialState.email
// ));
