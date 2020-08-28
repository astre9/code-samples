import ReceiptStore from './receiptStore';
import { createContext } from 'react';
import { configure } from 'mobx';

configure({enforceActions: 'always'});

export class RootStore {
    receiptStore: ReceiptStore;

    constructor() {
        this.receiptStore = new ReceiptStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());