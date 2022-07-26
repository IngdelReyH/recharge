import { action, computed, observable, runInAction } from "mobx";
import { useNavigate } from 'react-router-dom';
import agentR from "../api/agentR";
import { RootStore } from "./rootStore";
import { history } from "../..";
import { IAttendee, IRecarga } from "../models/recarga";
import { SemanticCOLORS } from "semantic-ui-react";
import { ICompra } from "../models/compra";
import {v4 as uuid} from 'uuid';
import { IUser } from "../models/user";

export default class ComprasStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

  // @observable compraList: IAttendee[] | null = null;
  @observable compraList: ICompra[] | null = null;
   @observable recarga: IRecarga | null =null;
   @observable compra: ICompra={id: '', state: '',refunded:false,dateBought: new Date("2019-01-16"),title: '',price: '',buyer: ''};
   @observable totVendido: number | null =null;
   @observable isAttended: boolean=false;
   @observable buttonText: string | null="Unatended";
   @observable extraColor: SemanticCOLORS='red';
    

   @action listaC = async () => {
    const compraList = await agentR.Compras.listaC();
    runInAction (()=>{
        this.compraList=compraList;
        console.log("lista de compra:",compraList)
    })
    console.log("estory en lista de compras")
   
    history.push('/historialrecarga')
     //history.push('/trash')
   }

   @action registerC = async ()=> {
        console.log("debe haberse registrado la compra")
        try{
                const compra = await agentR.Compras.createC(this.compra);
        }
        catch(error){
            console.log("error del comprasstore createc:",error);
                    throw error;
        }
    }
    @action setRecarga= (r: IRecarga,u: IUser | null) =>{
        //this.recarga=r;
        this.compra.price=r.price;
        this.compra.title=r.title;
        this.compra.id= uuid();
        this.compra.buyer=u!.displayName;
        
         //r.attendees.at(r.attendees.lastIndexOf())
        console.log("la compra guardada para la compra es:",this.compra)
       
        
    }
    @action AttendCompra = async (a: ICompra)=>{
      console.log("se debe haber editado la compra:",a)
      this.compra=a;
      this.compra.state='Attended';
      this.compra.refunded=false;
      /*if(this.compra.state=='Attended')
      {
      this.isAttended=true;
      }else if(this.compra.state=='Unattended')
      {
        this.isAttended=false;
      }*/
    //  a.state="Attended";
      //console.log("el state de la compra es:",a.state)
     await agentR.Compras.update(a);
     history.push('/trash');
     this.listaC();
     /* const compra= await agentR.Compras.infoC(a.dateBought);//;
      runInAction (()=>{
        console.log("la compra q se obtuvo fue:",compra); 
    })*/

     
    }
    @action CancelCompra =async (a:ICompra) => {
      this.compra=a;
      this.compra.state='Canceled';
      this.compra.refunded=false; 
      await agentR.Compras.update(a);
     history.push('/trash');
     this.listaC();
    }
    @action RefundCompra =async (a:ICompra) => {
      this.compra=a;
      this.compra.state='Canceled';
      this.compra.refunded=true; 
      await agentR.Compras.update(a);
     history.push('/trash');
     this.listaC();
    }
    @action setCompras =  ()=>{
      /*this.compraList?.map(c=>(
        this.compra!.buyer=c.appUser.displayName,
        this.compra!.dateBought=c.dateBought,
        this.compra!.price=c.recarga.price,
        this.compra!.title=c.recarga.title,
        this.compra!.refunded=false,
        this.compra!.state="Unattended",
        agentR.Compras.createC2(this.compra!),
        console.log("se debe haber guardado")
      ))*/try
      {
        var last = this.compraList!.at(-1)
      /*const relleno= last?.appUser.displayName;
      if(relleno!=null)
      this.compra.buyer=relleno;*/
      /*this.compra!.dateBought=last!.dateBought;
      this.compra!.price=last!.recarga.price;
      this.compra!.title=last!.recarga.title;
      this.compra!.refunded=false;
      this.compra!.state="Unattended";*/
      //descomentar arreglado//console.log("el ultimo indice last de la compra list es:",last?.appUser.displayName);
      //console.log("la compra q se debe haber guardado en this.compra es :", this.compra);
      }catch(error)
      {
        throw(error)
      }
      
    }
    @action totalVendido =()=>
    {
        /*for (let i = 0; i < this.compraList!.length(); i++) {
            console.log ("Block statement execution no." + i);
          }*/ var total =0;
            var num =0;
          for (var val of this.compraList!) {
            //console.log("precios:",val.recarga.price); // prints values: 10, 20, 30, 40
           // num=parseInt(val.recarga.price);
           num=parseInt(val.price);
            total+=num;
          }
          //console.log("el total vendido es:",total);
          this.totVendido=total;
         // this.setCompras();
    }

    @action setAttended = (a: boolean)=>{
       // this.isAttended=this.;
        //console.log("el text antes era:",this.buttonText);
        //this.buttonText="Attended";
       // console.log("el text es:",this.buttonText);
       //this.extraColor='green'
        history.push('/trash')
        this.listaC();
       // history.push('/historialrecarga')
    }


}