export class CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  globalId: string;
  officeCode: string;
  country: string;
  isPending?: boolean;
  isDisable?: boolean;
}
