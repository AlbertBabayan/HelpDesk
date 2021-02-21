export interface IToken {
  access: {
      token: string;
      expires: Date;
  };
  refresh: {
      token: string;
      expires: Date;
  };
}
