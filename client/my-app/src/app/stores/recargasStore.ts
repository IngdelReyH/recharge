import { action, computed, observable, runInAction } from "mobx";
import { useNavigate } from 'react-router-dom';
import agentR from "../api/agentR";
import { RootStore } from "./rootStore";
import { history } from "../..";
import { IRecarga } from "../models/recarga";

export default class RecargasStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @observable recargaPrice: number = 0;

    @observable recargaName:string="";

    @observable recarga : IRecarga | null =null;


    @action setPrice= (p: number) =>{
        this.recargaPrice=p;
        console.log("pincho el setPrice, es:",this.recargaPrice);
    }

    @action setName= (n: string) =>{
        this.recargaName=n;
        
    }

    @action setRecarga= (r: IRecarga) =>{
        this.recarga=r;
        
    }

    @action backToRecargas =() =>{
        console.log("debio pinchar el return to recargas");
        history.push('/recargas');
    }
}