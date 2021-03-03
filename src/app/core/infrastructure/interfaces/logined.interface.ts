import { IToken } from './tokens.interface';
import { IUser } from './user.interface';

export interface ILogined {
    user: IUser;
    tokens: IToken;
}
