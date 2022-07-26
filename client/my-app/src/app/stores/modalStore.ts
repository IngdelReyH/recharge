import { observable, action } from "mobx";
import { RootStore } from "./rootStore";


export default  class ModalStore{
 rootStore: RootStore;

 constructor(rootStore: RootStore){
    this.rootStore=rootStore;
 }

 @observable.shallow modal = {
    open: false,
    body: null
 }

 @action openModal = (content: any) =>{
   console.log("se deberia haber abierto el modal");
   console.log("el valor de open pre modificacion es:",this.modal.open);
    this.modal.open = true;
    this.modal.body = content;
    console.log("el valor de open post modificacion es:",this.modal.open);

 }

 @action closeModal = ()=> {
    this.modal.open = false;
    this.modal.body = null;
 }
}