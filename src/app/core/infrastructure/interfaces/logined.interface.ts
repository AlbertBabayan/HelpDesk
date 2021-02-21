import { IToken } from './tokens.interface';
import { IUser } from './user.interface';

export interface ILogined {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
    tokens: {
      access: {
        token: string;
        expires: Date;
    };
      refresh: {
        token: string;
        expires: Date;
      }
    };
}
