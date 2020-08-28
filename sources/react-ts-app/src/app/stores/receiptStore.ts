import { observable, action, computed, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import agent from "../api/agent";
import { IContext, ContextFormValues } from "../models/receipt";

export default class ReceiptStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable receiptRegistry = new Map();
  @observable contexts: IContext[] | null = null;
  @observable loadingInitial = false;
  @observable savingContexts = false;
  @observable loadingContexts = false;

  @action loadReceipts = async () => {
    this.loadingInitial = true;
    try {
      const receipts = await agent.Receipts.list();
      runInAction("loading receipts", () => {
        receipts.forEach((receipt) => {
          this.receiptRegistry.set(receipt.filename, receipt);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load receipts error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadContexts = async (filename: string) => {
    this.loadingContexts = true;
    try {
      const contexts = await agent.Receipts.details(filename);
      runInAction("loading contexts", () => {
        this.contexts = contexts;
        this.loadingContexts = false;
      });
      return contexts;
    } catch (error) {
      runInAction("load contexts error", () => {
        this.loadingContexts = false;
      });
    }
  };

  @action saveContexts = async (
    filename: string,
    contextsForm: ContextFormValues
  ) => {
    this.savingContexts = true;
    try {
      await agent.Receipts.saveContexts(filename, contextsForm.contexts!);
      runInAction("saving contexts", () => {
        this.savingContexts = false;
      });
    } catch (error) {
      runInAction("saving contexts error", () => {
        this.savingContexts = false;
      });
    }
  };

  @computed get receiptsSorted() {
    return Array.from(this.receiptRegistry.values());
  }
}
