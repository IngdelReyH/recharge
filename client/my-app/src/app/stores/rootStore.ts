import { createContext } from "react";
import UserStore from "./userStore";
import { configure } from "mobx";
import Commonstore from "./commonStore";
import ModalStore from "./modalStore";
import RecargasStore from "./recargasStore";
import ComprasStore from "./comprasStore";

configure({enforceActions: 'always'});

export class RootStore {
    userStore: UserStore;
    commonStore: Commonstore;
    modalStore: ModalStore;
    recargasStore: RecargasStore;
    comprasStore: ComprasStore;

    constructor(){
        this.userStore = new UserStore(this);
        this.commonStore = new Commonstore(this);
        this.modalStore = new ModalStore(this);
        this.recargasStore = new RecargasStore(this);
        this.comprasStore = new ComprasStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());
