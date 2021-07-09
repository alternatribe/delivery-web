import { RoleEnum } from './role.enum';
import { Address } from './address.model';
export class User {
  id!: string;
  name!: string;
  email!: string;
  role!: RoleEnum;
  address!: Address;
  password!: string;
  newPassword!: string;
}
