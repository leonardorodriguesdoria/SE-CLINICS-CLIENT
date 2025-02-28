import { UserRole } from '../enums/user-role.enum';

export interface IRegisterUser {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly birthDate?: string;
  readonly healthPlan?: string;
  readonly specialization?: string;
  readonly clinicsId?: number[];
}
