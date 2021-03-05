import { IToken } from './tokens.interface';

export interface IRestore {
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
    tokens: IToken;
}
