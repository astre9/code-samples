export interface IReceipt {
  filename: string;
  url: string;
  isVerified: boolean;
}

export enum ContextType {
  CodFiscal = 0,
  NumarBon = 1,
  Total = 2,
}

export interface IContext {
  content: string;
  type: ContextType | null;
  isGood: boolean;
}

export interface IContextFormValues {
  contexts: IContext[] | null;
}

export class ContextFormValues implements IContextFormValues {
  contexts: IContext[] | null = null;

  constructor(init?: IContext[] | null) {
    this.contexts = [];
    Object.assign(this.contexts, init);
  }
}
